<template>
  <!-- <div class="">
    <h1 class="text-bold text-3xl text-vert font-montserrat text-blue-700">Hello World !</h1>
  </div> -->
  <router-view v-slot="{ Component }">
		<component :is="Component" />
	</router-view>
</template>

<script setup>

</script>

<style scoped>

</style>
