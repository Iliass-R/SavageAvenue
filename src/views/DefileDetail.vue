<template>
  <div class="font-montserrat">
    <Header />
    <Navbar />
    <SectionTitle :title="sectionTitle" />
    <div class="container" v-if="defile && defilePhotos">
      <img
        :src="getFirstImageUrl(defile)"
        alt="Première image"
        class="featured-image"
      />
      <div class="flex flex-row space-x-3 w-full">
        <div v-for="photo in defilePhotos" :key="photo" class="">
          <img :src="photo" alt="Photo du défilé" class="additional-image" />
        </div>
      </div>
      <p class="mt-4">{{ defile.show_description }}</p>

      <!-- Lieu et date du défilé -->
      <div class="m-6 my-12">
        <p class="text-lg underline">Où se déroule le défilé ?</p>
        <p>Code Postal : {{ defile.show_zip }}</p>
        <p>Date : {{ formatDate(defile.show_date) }}</p>
      </div>

      <div
        class="font-poppins font-bold text-lg my-16 mx-auto justify-center flex items-center"
      >
        <h2>
          Inscrivez-vous dès maintenant au défilé pour être tenu au courant du
          lieu exact 2 semaines avant la date.
        </h2>
      </div>
      <!-- Formulaire d'inscription -->
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="flex flex-row w-full space-x-4">
          <div class="mb-3 w-1/2">
            <label for="name" class="form-label">Nom :</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 w-1/2">
            <label for="email" class="form-label">Adresse e-mail :</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="attendees" class="form-label"
            >Nombre de participants :</label
          >
          <select
            id="attendees"
            v-model="attendees"
            class="form-select"
            required
          >
            <option value="1">1 personne</option>
            <option value="2">2 personnes</option>
            <option value="3">3 personnes</option>
            <option value="4">4 personnes</option>
            <option value="5">5 personnes</option>
            <!-- Ajoutez d'autres options si nécessaire -->
          </select>
        </div>
        <div class="flex mx-auto justify-center">
          <PrimaryButton
            class="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium hover:bg-green-500 text-white transition focus:outline-none focus:ring active:text-green-500"
            text="S'inscrire"
            @click="submitForm"
          />
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import SectionTitle from "../components/SectionTitle.vue";
import Footer from "../components/Footer.vue";
import PrimaryButton from "../components/buttons/PrimaryButton.vue";

const sectionTitle = ref("");

const defile = ref({});
const defilePhotos = ref([]);

const name = ref("");
const email = ref("");
const attendees = ref(1);

const router = useRouter();

const fetchDefileDetails = async () => {
  const defileId = router.currentRoute.value.params.id;
  const { data, error } = await supabase
    .from("Defile")
    .select("*")
    .eq("show_id", defileId)
    .single();
  if (error) {
    console.error(error);
  } else {
    defile.value = data;
    defilePhotos.value = JSON.parse(data.show_pictures);
    sectionTitle.value = data.show_name;
  }
};

const getFirstImageUrl = (defile) => {
  if (defilePhotos.value && defilePhotos.value.length > 0) {
    return defilePhotos.value[0];
  } else {
    return;
  }
};

const formatDate = (dateString) => {
  const showDate = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return showDate.toLocaleDateString("fr-FR", options);
};

const submitForm = async () => {
  if (!name.value || !email.value) {
    console.error("Veuillez remplir tous les champs obligatoires.");
    return;
  }
  try {
    const { error: insertError } = await supabase.from("viewer").insert([
      {
        viewer_name: name.value,
        viewer_mail: email.value,
        viewer_number: attendees.value,
        defile_id: defile.value.show_id,
      },
    ]);

    if (insertError) {
      throw new Error(insertError.message);
    } else {
      name.value = "";
      email.value = "";
      attendees.value = 1;

      router.push("/home");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la soumission du formulaire d'onboarding :",
      error
    );
  }
};

onMounted(() => {
  fetchDefileDetails();
});
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.featured-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
}

.additional-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
