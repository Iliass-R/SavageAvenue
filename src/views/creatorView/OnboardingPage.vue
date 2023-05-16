<template>
  <section class="bg-white font-montserrat">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside
        class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt="Pattern"
          src="../../assets/onBoardingPicture.svg"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </aside>

      <main
        aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <h1
            class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Onboarding
          </h1>

          <h2 class="mt-8 text-lg font-medium text-gray-900">
            Bienvenue dans l'onboarding
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            L'onboarding est une étape importante pour configurer votre compte
            créateur. Veuillez fournir les informations suivantes pour
            personnaliser votre profil et commencer votre expérience.
          </p>

          <form
            class="mt-8 grid grid-cols-6 gap-6"
            @submit.prevent="submitForm"
          >
            <div class="col-span-6">
              <label for="name" class="block text-sm font-medium text-gray-700">
                Nom du compte créateur
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 p-3"
                required
                v-model="name"
              />
            </div>

            <div class="col-span-6">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Description du compte créateur
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-3 resize-none"
                required
                v-model="description"
              ></textarea>
            </div>

            <div class="col-span-6">
              <label
                for="ProfilePicture"
                class="block text-sm font-medium text-gray-700"
                >Photo de profil</label
              >
              <input
                type="file"
                id="my-file"
                name="profilePicture"
                accept="image/*"
                @change="handleProfilePictureChange"
                class="mt-1"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <PrimaryButton
                class="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium hover:bg-green-500 text-white transition focus:outline-none focus:ring active:text-green-500"
                text="Enregistrer mes informations"
                :class="{ 'disabled-button': isButtonDisabled }"
                :disabled="isButtonDisabled"
                @click="submitForm"
              />
            </div>
          </form>
          <div v-if="errorMessage" class="mt-4">
            <ErrorMessage :text="errorMessage" />
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";
import ErrorMessage from "../../components/messages/ErrorMessage.vue";
import { ref, watch } from "vue";
import { supabase } from "../../../supabase";
import { useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const isButtonDisabled = ref(true);
const profilePicture = ref(null);
const errorMessage = ref(null);

function checkFormValidity() {
  isButtonDisabled.value =
    !name.value || !description.value || !profilePicture.value;
}

watch([name, description, profilePicture], () => {
  checkFormValidity();
});

async function uploadProfilePicture(file, id) {
  const fileName = `${id}-${Date.now()}.jpg`; // Génère un nom de fichier unique

  const { data, error } = await supabase.storage
    .from("ProfilePic")
    .upload(`public/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
    throw new Error("Erreur lors de l'upload de l'image : " + error.message);
  } else {
    console.log("Upload réussi :", data);
    return data;
  }
}

function handleProfilePictureChange(event) {
  const file = event.target.files[0];

  if (file) {
    profilePicture.value = file;
  } else {
    profilePicture.value = null;
  }
}

const router = useRouter();

async function getUserData() {
  const { data: user, error } = await supabase.auth.getUser();
  console.log("user", user);
  if (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error
    );
    throw new Error(
      "Une erreur s'est produite lors de la récupération des données utilisateur."
    );
  }
  const id = user.user.id;
  return { id };
}

async function submitForm() {
  try {
    const { id, user } = await getUserData();
    console.log("id", id);

    const file = profilePicture.value;
    const fileName = `${id}-${Date.now()}.jpg`; // Génère un nom de fichier unique

    const uploadedData = await uploadProfilePicture(file, fileName);

    const { error: insertError } = await supabase
      .from("CompteCreateur")
      .insert([
        {
          name: name.value,
          description: description.value,
          profile_picture: `public/${fileName}`,
          created_at: new Date(),
          user_id: id,
        },
      ]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    router.push("/creator-home");
  } catch (error) {
    console.error(
      "Erreur lors de la soumission du formulaire d'onboarding :",
      error
    );
    errorMessage.value =
      "Une erreur s'est produite lors de la soumission du formulaire.";
  }
}
</script>

<style scoped>
.disabled-button {
  opacity: 0.5;
  pointer-events: none;
}
</style>
