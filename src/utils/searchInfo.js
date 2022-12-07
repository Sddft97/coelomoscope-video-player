import {
  ref,
  reactive
} from 'vue'
import videoInfoList from '@/utils/mockVideoInfo.js';

let searchData = reactive({
  videoName: '',
  videoType: '',
  createTimeBegin: '',
  createTimeEnd: '',
  lastVisitTimeBegin: '',
  lastVisitTimeEnd: '',
});

const search = () => {
  // TODO 之后改为查询数据库
  return videoInfoList.filter(video => trimSpaceFilter(video.videoName, searchData.videoName, (str1, str2) => str1.includes(str2)))
    .filter(video => trimSpaceFilter(video.videoType, searchData.videoType, (str1, str2) => str1 === str2))
    .filter(video => trimSpaceFilter(video.createTime, searchData.createTimeBegin, (str1, str2) => Date.parse(str1) >= Date.parse(str2)))
    .filter(video => trimSpaceFilter(video.createTime, searchData.createTimeEnd, (str1, str2) => Date.parse(str1) <= Date.parse(str2)))

}

const trimSpaceFilter = (primitiveData, searchData, filterHandler) => {
  const trimedSearchData = searchData.trim();
  if (!!trimedSearchData) {
    return filterHandler(primitiveData, trimedSearchData);
  }
  return true;
}

const reset = () => {
  function clearValue(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] == 'object') {
        clearValue(obj[key])
      } else {
        obj[key] = '';
      }
    });
  };
  clearValue(searchData);
}

let data = {
  searchData
}

let method = {
  search,
  reset
}

export {
  data,
  method
}