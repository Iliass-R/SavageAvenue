<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside
        class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt="Pattern"
          src="../../assets/SignupPicture.svg"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </aside>

      <main
        aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <a class="block text-blue-600" href="/">
            <span class="sr-only">Home</span>
            <img class="h-24" src="../../assets/LogoSlogan.svg" />
          </a>

          <h1
            class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Connexion
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            Connectez-vous à votre compte.
          </p>

          <form @submit.prevent="loginUser" class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label
                for="Email"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 p-3"
                required
                v-model="email"
              />
            </div>

            <div class="col-span-6">
              <label
                for="Password"
                class="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 p-3"
                required
                v-model="password"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <PrimaryButton
                class="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium hover:bg-green-500 text-white transition focus:outline-none focus:ring active:text-green-500"
                text="Se connecter"
                :class="{ 'disabled-button': isButtonDisabled }"
                :disabled="isButtonDisabled"
                @click="loginUser"
              />
              <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                Vous n'avez pas encore de compte ?
                <a
                  href="/sign-up"
                  class="underline text-green-700 hover:text-green-500 font-semibold"
                  >Inscrivez-vous</a
                >.
              </p>
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

const isButtonDisabled = ref(true);
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const UserData = ref("");

function checkFormValidity() {
  isButtonDisabled.value = !email.value || !password.value;
}

watch([email, password], () => {
  checkFormValidity();
});

const router = useRouter();

async function loginUser() {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      throw new Error(error.message);
    }

    const userData = await getUserData();
    // console.log("userData", userData);

    if (await isOnboardingRequired(userData.id)) {
      router.push("/onboarding");
    } else {
      router.push("/creator-home");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    errorMessage.value =
      "Une erreur s'est produite lors de la connexion de l'utilisateur.";
  }
}

async function getUserData() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  // console.log("userData", user);

  if (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error
    );
    throw new Error(
      "Une erreur s'est produite lors de la récupération des données utilisateur."
    );
  }

  const id = user.id;
  return { id };
}

async function isOnboardingRequired(userId) {
  console.log("userId", userId);
  const { data, error } = await supabase
    .from("CompteCreateur")
    .select("user_id")
    .eq("user_id", userId);

  console.log("data", data.length);
  // if data.length > 0, onboarding is done for this user => return false (onboarding not required) else return true (onboarding required)
  if (data.length > 0) {
    return false;
  } else {
    return true;
  }
}
</script>

<style scoped>
.disabled-button {
  opacity: 0.5;
  pointer-events: none;
}
</style>
