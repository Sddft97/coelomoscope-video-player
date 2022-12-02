<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

defineProps({
	msg: String
});

let routerPush = path => {
	router.push(path);
};

//const count = ref(store.state.count);
</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="store.dispatch('increment')">count is {{ store.state.count }}</button>
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
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
