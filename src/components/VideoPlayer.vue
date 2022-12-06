<template>
  <div>
    <div id="video-container">
      <video ref="videoPlayer" class="video-js vjs-big-play-centered "></video>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import { createVideoOptions } from '@/utils/videoPlayer';

export default {
  name: 'VideoPlayer',
  data() {
    return {
      player: null,
      options: null,
    }
  },
  props: {
    width: {
      type: String,
      default() { return ''; }
    }
  },
  methods: {
    changeVideo(sources) {
      this.player.src(sources);
    }
  },
  mounted() {
    this.options = createVideoOptions();
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
    });
    if (this.width !== '') {
      $('#video-container')[0].style.width = this.width;
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style>
#video-container {
  width: 100%;
}

/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}

/* 加载圆圈 */
.vjs-loading-spinner {
  font-size: 2.5em;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  margin-top: -1em;
  margin-left: -1.5em;
}

.video-js .vjs-time-control {
  display: block;
}

.video-js .vjs-remaining-time {
  display: none;
}
</style>