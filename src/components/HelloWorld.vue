<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import VideoPlayer from '@/components/VideoPlayer.vue';
import axios from '../utils/axios'


const router = useRouter();
const store = useStore();
const videoPlayer = ref();

let count = ref(0);
let vedioSrc = ref("https://prod-streaming-video-msn-com.akamaized.net/178161a4-26a5-4f84-96d3-6acea1909a06/2213bcd0-7d15-4da0-a619-e32d522572c0.mp4")

defineProps({
	msg: String
});

let routerPush = path => {
	router.push(path);
};

let sendResuest = () => {
	axios.get('/users/XPoet')
		.then((res) => {
			console.log('res: ', res)
		})
		.catch((err) => {
			console.log('err: ', err)
		})
}

let changeVideo = () => {
	count.value++;
	vedioSrc.value = count.value % 2 === 0 ?
		'https://prod-streaming-video-msn-com.akamaized.net/178161a4-26a5-4f84-96d3-6acea1909a06/2213bcd0-7d15-4da0-a619-e32d522572c0.mp4'
		: 'https://prod-streaming-video-msn-com.akamaized.net/b7014b7e-b38f-4a64-bd95-4a28a8ef6dee/113a2bf3-3a5f-45d4-8b6f-e40ce8559da3.mp4';
	videoPlayer.value.changeVideo([{
		type: "video/mp4", // 类型
		src: vedioSrc.value
	}]);
}

</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="changeVideo">count is {{ count }}</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code>
			to test HMR
		</p>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>
		, the official Vue + Vite starter
	</p>
	<p>
		Install
		<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
		in your IDE for a better DX
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
	<button @click="routerPush('/vuex')">点击</button>
	<router-view></router-view>
	<el-button type="primary" @click="sendResuest">发送请求</el-button>
	<div class="vedio-container">
		<VideoPlayer ref="videoPlayer"></VideoPlayer>
	</div>

</template>

<style scoped>
.vedio-container {
	width: 800px;
}

.read-the-docs {
	color: #888;
}
</style>
