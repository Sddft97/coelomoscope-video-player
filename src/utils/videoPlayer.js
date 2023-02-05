import {
  reactive
} from "vue";

export function createVideoOptions() {
  return reactive({
    playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0], // 可选的播放速度
    controls: true, // 是否能人为控制
    muted: false, // 是否静音
    preload: "auto", // 自动预加载
    language: "zh-CN", // 语言，'en', 'zh-cn', 'zh-tw'
    aspectRatio: "16:9", // 播放器高宽占比（例如"16:9"或"4:3"）
    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    sources: [{
      type: "video/mp4", // 类型
      src: "", // url地址
    }, ],
    notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true, // 是否显示当前时间和持续时间的分隔符，"/"
      durationDisplay: true, // 是否显示持续时间
      remainingTimeDisplay: true, // 是否显示剩余时间
      fullscreenToggle: true, // 是否显示全屏按钮
    },
  });
}