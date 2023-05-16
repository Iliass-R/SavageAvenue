<template>
    <div class="mx-6 mt-4 shadow-sm border-b border-gray-200 border-t">
        <h1 class="uppercase text-2xl font-light py-2">{{ props.title }}</h1>
    </div>
</template>

<script setup>

const props = defineProps({
// title type chaine de caractere
    title: {
        type: String,
        required: true
    }
})

</script>
