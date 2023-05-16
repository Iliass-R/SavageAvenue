<template>
  <div>
    <Header />
    <Navbar />
    <SectionTitle :title="featuredTitle" />
    <div class="m-6 font-poppins">
      <div v-if="featuredDefile">
        <img
          :src="getFeaturedImageUrl(featuredDefile)"
          alt="Défilé à la une"
          class="featured-image"
        />
        <h3 class="font-bold text-lg underline">
          Par {{ featuredDefile.show_name }}
        </h3>
        <p class="text-lg">{{ formatDate(featuredDefile.show_date) }}</p>
      </div>
      <SectionTitle :title="organizeTitle" />
      <div class="flex flex-row space-x-2 my-6">
        <img
          src="../assets/OrganizePicture.svg"
          alt="Organize Image"
          class="organize-image"
        />
        <div class="flex justify-center items-center px-6 font-montserrat">
          <p>
            Vous êtes créateur de mode et cherchez un moyen de mettre en avant
            vos créations ? Rejoignez notre plateforme et créez votre propre
            défilé en ligne ! Avec notre outil de création facile à utiliser,
            vous pourrez présenter votre collection à un public mondial et
            obtenir une visibilité sans précédent. Inscrivez-vous dès maintenant
            pour profiter de cette opportunité unique de faire découvrir votre
            talent à un public international !
          </p>
        </div>
      </div>
      <SectionTitle :title="logoTitle" />
      <div class="logo-section">
        <img src="../assets/Logo.svg" alt="Logo" class="logo-image" />
        <p
          class="flex justify-between mx-auto px-28 font-montserrat text-lg my-8"
        >
          Nous proposons des défilés dans différentes villes. Vous pouvez vous
          inscrire en remplissant un formulaire, mais l'adresse exacte du défilé
          ne sera communiquée qu'une semaine avant l'événement par mail.
        </p>
        <PrimaryButton
          class="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 my-6 text-sm font-medium hover:bg-green-500 text-white transition focus:outline-none focus:ring active:text-green-500"
          text="Plus d'informations"
          @click="goToHowItWorks"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../supabase";
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import SectionTitle from "../components/SectionTitle.vue";
import Footer from "../components/Footer.vue";
import PrimaryButton from "../components/buttons/PrimaryButton.vue";

const featuredTitle = "À la une";
const organizeTitle = "Organise ton défilé";
const logoTitle = "Découvrez nos défilés";

const featuredDefile = ref(null);

const router = useRouter();

const fetchFeaturedDefile = async () => {
  const { data, error } = await supabase
    .from("Defile")
    .select("*")
    .eq("show_name", "Défilé Sauvage")
    .limit(1);
  if (error) {
    console.error(error);
  } else {
    featuredDefile.value = data[0];
  }
};

const getFeaturedImageUrl = (defile) => {
  if (defile && defile.show_pictures) {
    const pictureUrls = JSON.parse(defile.show_pictures);
    return pictureUrls[0];
  } else {
    return "/assets/default-image.jpg";
  }
};

const formatDate = (dateString) => {
  const showDate = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return showDate.toLocaleDateString("fr-FR", options);
};

const goToHowItWorks = () => {
  // Code pour rediriger vers la page "Comment ça marche"
  router.push("/commentCaMarche");
};

onMounted(() => {
  fetchFeaturedDefile();
});
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.featured-image {
  width: 90%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}
.organize-image {
  width: 50%;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.logo-image {
  width: 400px;
  height: 400px;
  object-fit: contain;
  margin-bottom: 10px;
}

.more-info-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.more-info-button:hover {
  background-color: #0056b3;
}
</style>
