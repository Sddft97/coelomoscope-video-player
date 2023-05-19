import { ref, reactive, computed, watch } from "vue";
import { ElMessage } from "element-plus";

// 切片大小
export const SIZE = 10 * 1024 * 1024;
const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading",
};

export function useFileUpload() {
  const container = reactive({
    file: null,
    hash: "",
    ext: "",
    worker: null,
  });
  const hashPercentage = ref(0);
  const data = ref([]);
  const requestList = ref([]);
  const status = ref(Status.wait);
  // 当暂停时会取消 xhr 导致进度条后退
  // 为了避免这种情况，需要定义一个假的进度条
  const fakeUploadPercentage = ref(0);

  const uploadDisabled = computed(() => {
    return (
      !container.file || [Status.pause, Status.uploading].includes(status.value)
    );
  });
  const uploadPercentage = computed(() => {
    if (!container.file || !data.value.length) return 0;
    const loaded = data.value
      .map((item) => item.size * item.percentage)
      .reduce((acc, cur) => acc + cur);
    return parseInt((loaded / container.file.size).toFixed(2));
  });
  watch(uploadPercentage, (now) => {
    if (now > fakeUploadPercentage.value) {
      fakeUploadPercentage.value = now;
    }
  });

  async function handleDelete() {
    const { data } = await request({
      url: "http://localhost:3000/delete",
    });
    if (JSON.parse(data).code === 0) {
      ElMessage.success("delete success");
    }
  }

  function handlePause() {
    status.value = Status.pause;
    resetData();
  }

  function resetData() {
    requestList.value.forEach((xhr) => xhr.abort());
    requestList.value = [];
    if (container.worker) {
      container.worker.onmessage = null;
    }
  }
  async function handleResume() {
    status.value = Status.uploading;
    const { uploadedList } = await verifyUpload(
      container.file.name,
      container.hash,
      verifyUrl
    );
    await uploadChunks(uploadedList, uploadUrl, mergeUrl);
  }
  // xhr
  function request({
    url,
    method = "post",
    data,
    headers = {},
    onProgress = (e) => e,
    requestList,
  }) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = onProgress;
      xhr.open(method, url);
      Object.keys(headers).forEach((key) =>
        xhr.setRequestHeader(key, headers[key])
      );
      xhr.send(data);
      xhr.onload = (e) => {
        // 将请求成功的 xhr 从列表中删除
        // remove xhr which status is success
        if (requestList) {
          const xhrIndex = requestList.findIndex((item) => item === xhr);
          requestList.splice(xhrIndex, 1);
        }
        resolve({
          data: e.target.response,
        });
      };
      // 暴露当前 xhr 给外部
      // export xhr
      requestList?.push(xhr);
    });
  }
  // 生成文件切片
  // create file chunk
  function createFileChunk(file, size = SIZE) {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({
        file: file.slice(cur, cur + size),
      });
      cur += size;
    }
    return fileChunkList;
  }
  // 生成文件 hash（web-worker）
  // use web-worker to calculate hash
  function calculateHash(fileChunkList) {
    return new Promise((resolve) => {
      container.worker = new Worker("/hash.js");
      container.worker.postMessage({
        fileChunkList,
      });
      container.worker.onmessage = (e) => {
        const { percentage, hash } = e.data;
        hashPercentage.value = percentage;
        if (hash) {
          resolve(hash);
        }
      };
    });
  }

  function handleFileChange(e) {
    const [file] = e.target.files;
    if (!file) return;
    resetData();
    // Object.assign(this.$data, this.$options.data());
    container.file = file;
  }
  async function handleUpload(uploadUrl, mergeUrl, verifyUrl) {
    if (!container.file) return;
    status.value = Status.uploading;
    const fileChunkList = createFileChunk(container.file);
    container.hash = await calculateHash(fileChunkList);

    const { shouldUpload, uploadedList } = await verifyUpload(
      container.file.name,
      container.hash,
      verifyUrl
    );
    if (!shouldUpload) {
      ElMessage.success("skip upload：file upload success");
      status.value = Status.wait;
      return;
    }

    data.value = fileChunkList.map(({ file }, index) => ({
      fileHash: container.hash,
      index,
      hash: container.hash + "-" + index,
      chunk: file,
      size: file.size,
      percentage: uploadedList.includes(index) ? 100 : 0,
    }));

    return await uploadChunks(uploadedList, uploadUrl, mergeUrl);
  }
  // 上传切片，同时过滤已上传的切片
  // upload chunks and filter uploaded chunks
  async function uploadChunks(uploadedList = [], uploadUrl, mergeUrl) {
    const newRequestList = data.value
      .filter(({ hash }) => !uploadedList.includes(hash))
      .map(({ chunk, hash, index }) => {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("chunkName", hash);
        formData.append("filename", container.file.name);
        formData.append("fileExt", container.ext);
        formData.append("fileHash", container.hash);
        return {
          formData,
          index,
        };
      })
      .map(({ formData, index }) =>
        request({
          url: uploadUrl,
          data: formData,
          onProgress: createProgressHandler(data.value[index]),
          requestList: requestList.value,
        })
      );
    await Promise.all(newRequestList);
    // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时合并切片
    // merge chunks when the number of chunks uploaded before and
    // the number of chunks uploaded this time
    // are equal to the number of all chunks
    if (uploadedList.length + newRequestList.length === data.value.length) {
      return await mergeRequest(mergeUrl);
    }
  }
  // 通知服务端合并切片
  // notify server to merge chunks
  async function mergeRequest(mergeUrl) {
    if (!mergeUrl) {
      ElMessage.error("merge request url is required");
      return;
    }
    const { data } = await request({
      url: mergeUrl,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        size: SIZE,
        fileHash: container.hash,
        fileName: container.file.name,
        fileExt: container.ext,
      }),
    });
    ElMessage.success("upload success");
    status.value = Status.wait;
    return JSON.parse(data);
  }
  // 根据 hash 验证文件是否曾经已经被上传过
  // 没有才进行上传
  // verify that the file has been uploaded based on the hash
  // skip if uploaded
  async function verifyUpload(filename, fileHash, verifyUrl) {
    console.log(fileHash);
    if (!verifyUrl) {
      return {
        shouldUpload: true,
        uploadedList: [],
      };
    }
    const { data } = await request({
      url: verifyUrl,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        filename,
        fileExt: container.ext,
      }),
    });
    return JSON.parse(data).data;
  }
  // 用闭包保存每个 chunk 的进度数据
  // use closures to save progress data for each chunk
  function createProgressHandler(item) {
    return (e) => {
      item.percentage = parseInt(String((e.loaded / e.total) * 100));
    };
  }

  return {
    container,
    hashPercentage,
    uploadDisabled,
    uploadPercentage,

    handleDelete,
    handlePause,
    handleFileChange,
    handleResume,
    handleUpload,
  };
}
