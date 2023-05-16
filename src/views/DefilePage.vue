<template>
  <Header />
  <Navbar />
  <div class="page-container font-montserrat h-full flex flex-col">
    <SectionTitle :title="sectionTitle" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <router-link
        v-for="defile in defiles"
        :key="defile.show_id"
        :to="`/defile/${defile.show_id}`"
        class="bg-white p-4 rounded shadow"
      >
        <img
          :src="getFirstImageUrl(defile)"
          alt="Défilé"
          class="w-full h-40 object-cover mb-2 rounded"
        />
        <h2 class="text-lg font-semibold mb-1">{{ defile.nom }}</h2>
        <p class="text-gray-500 text-sm mb-2">
          Créateur : {{ defile.createur }}
        </p>
        <p class="text-gray-500 text-sm">
          Date : {{ formatDate(defile.show_date) }}
        </p>
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import SectionTitle from "../components/SectionTitle.vue";
import Footer from "../components/Footer.vue";
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";

const defiles = ref([]);
const sectionTitle = ref("Défilés");

const getFirstImageUrl = (defile) => {
  if (defile.show_pictures && defile.show_pictures.length > 0) {
    const pictureUrls = JSON.parse(defile.show_pictures);
    return pictureUrls[0];
  } else {
    return;
  }
};

const fetchDefiles = async () => {
  const { data: defilesData, error: defilesError } = await supabase
    .from("Defile")
    .select("*")
    .eq("isAccepted", true);

  if (defilesError) {
    console.error(defilesError);
  } else {
    defiles.value = defilesData;
    console.log(defilesData);
  }

  for (let i = 0; i < defiles.value.length; i++) {
    const { data: creatorData, error: creatorError } = await supabase
      .from("CompteCreateur")
      .select("name")
      .eq("user_id", defiles.value[i].user_id);
    if (creatorError) {
      console.error(creatorError);
    } else {
      defiles.value[i].createur = creatorData[0]?.name || "";
    }
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
};

onMounted(() => {
  fetchDefiles();
});
</script>

<style>
.page-container {
  min-height: 100vh;
}
</style>
