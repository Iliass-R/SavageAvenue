<template>
<div class="flex flex-col">
    <label :for="props.id" class="text-black mb-1.5 font-poppins font-light">{{ props.label }}</label>
    <input :id="props.id" :type="props.type" :disabled="props.disabled" :placeholder="props.placeholder" :min="props.min" :max="props.max" class="border border-slate-900 p-2.5 focus:outline-none focus:border-black focus:border-2" />
</div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: "Label",
    },
    type: {
        type: String,
        default: "text",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "Placeholder",
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 0,
    },
});

</script>

<style scoped>

</style>