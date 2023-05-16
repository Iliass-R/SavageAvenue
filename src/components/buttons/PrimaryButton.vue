<template>
<!-- Boutton noir avec écriture blanche.  -->
<button class="bg-black text-white py-2 px-24 uppercase">
    {{ props.text }}
</button>

</template>

<script setup>
const props = defineProps({
	text: {
		type: String,
		default: "Primary Button",
	},
});
</script>