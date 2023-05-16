<template>
  <!-- Logo à centrer -->
  <div class="flex justify-between">
    <div class="mx-auto">
      <img
        src="../assets/LogoSlogan.svg"
        alt="Logo et slogan"
        @click="redirectToHome"
        class="cursor-pointer"
      />
    </div>
    <div class="absolute right-0 mt-8">
      <a
        href="/login"
        class="text-base font-bold font-montserrat underline uppercase mr-4"
        >Espace créateur</a
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToHome = () => {
  router.push("/home");
};
</script>

<style scoped></style>
