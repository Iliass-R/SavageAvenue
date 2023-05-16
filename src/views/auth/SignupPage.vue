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
            Inscription
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            Vous aurez bientôt accès à l'espace de création de vos défilés.
          </p>

          <form action="#" class="mt-8 grid grid-cols-6 gap-6">
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

            <div class="col-span-6 sm:col-span-3">
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
                @input="checkFormValidity"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="PasswordConfirmation"
                class="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 p-3"
                required
                v-model="passwordConfirmation"
                @input="checkFormValidity"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <PrimaryButton
                class="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium hover:bg-green-500 text-white transition focus:outline-none focus:ring active:text-green-500"
                text="Créer un compte"
                :class="{ 'disabled-button': isButtonDisabled }"
                :disabled="isButtonDisabled"
                @click="createUser"
              />
              <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                Vous avez déjà un compte ?
                <a
                  href="/login"
                  class="underline text-green-700 hover:text-green-500 font-semibold"
                  >Connectez-vous</a
                >.
              </p>
            </div>
          </form>
          <div v-if="passwordError || errorMessage" class="mt-4">
            <ErrorMessage :text="passwordError || errorMessage" />
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";
import ErrorMessage from "../../components/messages/ErrorMessage.vue";
import { ref, computed } from "vue";
import { supabase } from "../../../supabase";

const isButtonDisabled = ref(true);
const password = ref("");
const passwordConfirmation = ref("");
const email = ref("");
const passwordError = ref("");
const errorMessage = ref("");

const isPasswordMatch = computed(() => {
  return password.value === passwordConfirmation.value;
});

function checkFormValidity() {
  const inputs = document.querySelectorAll("input[required]");

  for (const input of inputs) {
    if (!input.value) {
      isButtonDisabled.value = true;
      return;
    }
  }

  if (password.value.length < 8) {
    passwordError.value =
      "Le mot de passe doit comporter au moins 8 caractères.";
    isButtonDisabled.value = true;
    return;
  }

  if (!isPasswordMatch.value) {
    passwordError.value = "Les mots de passe ne correspondent pas.";
    isButtonDisabled.value = true;
    return;
  }

  passwordError.value = "";
  isButtonDisabled.value = false;
}

async function createUser() {
  try {
    console.log(email.value, password.value);
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur :",
      error.message
    );
    errorMessage.value =
      "Une erreur s'est produite lors de la création de l'utilisateur.";
  }
  return user;
}
</script>

<style scoped>
.disabled-button {
  opacity: 0.5;
  pointer-events: none;
}
</style>
