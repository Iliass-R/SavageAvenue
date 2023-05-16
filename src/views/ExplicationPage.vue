<template>
  <div class="bg-white font-montserrat">
    <Header />
    <Navbar />
    <SectionTitle :title="title" />
    <div class="py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
          <div class="px-4 py-5 sm:p-6">
            <p class="text-lg leading-7 text-gray-700">
              Nous proposons régulièrement des défilés dans différentes villes.
              Vous pouvez consulter les informations sur les défilés proposés,
              comme les dates et les thèmes, sur notre page.
            </p>
            <p class="mt-4 text-lg leading-7 text-gray-700">
              Cependant, afin de maintenir une certaine exclusivité et de rendre
              l'expérience plus excitante, nous ne partageons pas l'adresse
              exacte du défilé jusqu'à une semaine avant l'événement. Ainsi,
              pour vous inscrire à un défilé, vous devez remplir notre
              formulaire d'inscription en ligne.
            </p>
            <p class="mt-4 text-lg leading-7 text-gray-700">
              Une semaine avant le défilé, vous recevrez un e-mail avec
              l'adresse exacte du lieu où aura lieu le défilé, ainsi que toutes
              les informations nécessaires pour y participer.
            </p>
            <p class="mt-4 text-lg leading-7 text-gray-700">
              Nous espérons que vous apprécierez cette expérience unique et nous
              vous remercions de votre intérêt pour nos défilés !
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import SectionTitle from "../components/SectionTitle.vue";
import Footer from "../components/Footer.vue";

const title = "Comment ça marche";
</script>

<style scoped>
.page-container {
  @apply mx-auto p-6;
}

.section-title {
  @apply text-3xl font-semibold text-gray-800 mb-8;
}

@media (min-width: 768px) {
  .section-title {
    @apply text-4xl;
  }
}
</style>
