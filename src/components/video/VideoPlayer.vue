<template>
  <div>
    <div id="video-container">
      <VueDPlayer ref="dplayer" :options="options"></VueDPlayer>
    </div>
  </div>
</template>

<script>
import VueDPlayer from './private/VueDPlayer.vue'
import 'vue-dplayer/dist/vue-dplayer.css'
import dashjs from 'dashjs'


export default {
  name: 'VideoPlayer',
  data() {
    return {
      dplayer: null,
      dashPlayer: dashjs.MediaPlayer().create(),
      options: {
        video: {
          // TODO url暂时写死
          url: 'http://localhost:8888/videos/output/stream.mpd',
          type: 'customDash',
          customType: {
            customDash: (video, player) => {
              this.dashPlayer.initialize(video, video.src, false);
            },
          },
        },
        highlight: [{
          time: 20,
          text: '这是第 20 秒',
        },
        {
          time: 120,
          text: '这是 2 分钟',
        }],
      },
    }
  },
  methods: {
    switchHazeMode(requireDehaze) {
      const hazeMode = requireDehaze ? 1 : 0; // 分辨率1表示去雾，0表示不去雾
      this.dashPlayer.setQualityFor('video', hazeMode, true);
    }
  },
  mounted() {
    this.dplayer = this.$refs.dplayer.dp;
    // 如果通过手动选择无缝切换去雾/不去雾
    // 则需要禁用dash协议根据网速自动切换的abr算法
    this.dashPlayer.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: { video: false },
        }
      }
    })
    // 修改一部分label文字
    this.dplayer.template.loop.querySelector('.dplayer-label').innerText = '循环播放';
  },
  beforeDestroy() {
    this.dashPlayer?.destroy();
    this.dplayer?.destroy();
  },
  components: {
    VueDPlayer
  }
}
</script>

<style>
#video-container {
  width: 100%;
}
</style>