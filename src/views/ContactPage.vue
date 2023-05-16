<template>
  <div class="page-container font-montserrat h-full flex flex-col">
    <Header />
    <Navbar />
    <SectionTitle :title="title" />
    <div class="flex flex-col py-10 mx-3 items-center justify-center text-lg">
      <p>
        Pour toute demande ou question, n'hésitez pas à nous contacter à
        l'adresse suivante :
      </p>
      <p class="font-bold text-green-700 cursor-pointer hover:text-green-500">
        1stsavageavenue@gmail.com
      </p>
    </div>
    <div class="bottom-0 mt-auto">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import SectionTitle from "../components/SectionTitle.vue";
import Footer from "../components/Footer.vue";

const title = "Contact";
</script>
<style scoped>
.page-container {
  min-height: 100vh;
}
</style>
