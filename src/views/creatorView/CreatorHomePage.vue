<template>
  <div class="font-montserrat h-screen flex flex-col" style="overflow-y: auto">
    <Header />
    <Navbar />

    <div class="max-w-3xl mx-auto py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Card des informations personnelles -->
        <div class="card">
          <h2 class="card-title">Mes informations personnelles</h2>

          <form @submit="updateProfile" class="mb-4">
            <div class="mb-4">
              <label for="name" class="block font-semibold">Nom</label>
              <input type="text" id="name" v-model="name" class="form-input" />
            </div>

            <div class="mb-4">
              <label for="email" class="block font-semibold">Email</label>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-input"
                disabled
              />
            </div>

            <div class="mb-4">
              <label for="description" class="block font-semibold"
                >Description</label
              >
              <textarea
                id="description"
                v-model="description"
                class="form-textarea"
              ></textarea>
            </div>

            <button type="submit" class="btn-primary">Mettre à jour</button>
          </form>
        </div>

        <!-- Card des défilés -->
        <div class="card">
          <h2 class="card-title">Mes défilés</h2>

          <div
            v-if="defiles.length === 0"
            class="text-center text-gray-500 mt-4"
          >
            <p>Créez votre défilé maintenant !</p>
          </div>

          <div v-else>
            <div v-for="defile in defiles" :key="defile.id" class="defile-card">
              <button
                @click="toggleAccordion(defile.id)"
                class="flex items-center justify-between w-full mb-4 focus:outline-none"
              >
                <h3 class="flex-1">{{ defile.show_name }}</h3>
                <span
                  class="text-base pr-3"
                  :class="{
                    'text-green-500': defile.isAccepted === true,
                    'text-red-500': defile.isAccepted === false,
                    'text-orange-500': defile.isAccepted === null,
                  }"
                >
                  {{
                    defile.isAccepted === true
                      ? "Accepté"
                      : defile.isAccepted === false
                      ? "Refusé"
                      : "En attente"
                  }}
                </span>
                <svg
                  class="accordion-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  :class="{ 'rotate-180': isAccordionOpen(defile.id) }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                v-if="isAccordionOpen(defile.id)"
                class="accordion-content open"
              >
                <p>{{ defile.show_description }}</p>
                <p>{{ defile.show_address }}</p>
                <p>{{ defile.show_city }}</p>
                <p>{{ defile.show_zip }}</p>
                <p>{{ defile.show_date }}</p>
                <!-- Autres informations du défilé -->
                <button @click="deleteDefile()" class="btn-primary">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
          <button
            @click="showCreateEventForm"
            class="btn-primary mx-auto justify-center flex"
          >
            Nouveau défilé
          </button>
        </div>

        <div v-if="showFormModal" class="modal">
          <div class="modal-content">
            <h2 class="text-xl font-semibold mb-4">
              Formulaire de création de défilé
            </h2>

            <!-- Votre formulaire de création de défilé ici -->
            <form @submit="createDefile" class="mb-4">
              <div class="mb-4">
                <label for="name" class="block font-semibold"
                  >Nom du défilé</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="defileName"
                  class="form-input"
                />
              </div>

              <div class="mb-4">
                <label for="address" class="block font-semibold">Adresse</label>
                <input
                  type="text"
                  id="address"
                  v-model="defileAddress"
                  class="form-input"
                />
              </div>

              <div class="mb-4">
                <label for="zip" class="block font-semibold">Code postal</label>
                <input
                  type="text"
                  id="zip"
                  v-model="defileZip"
                  class="form-input"
                />
              </div>

              <div class="mb-4">
                <label for="city" class="block font-semibold">Ville</label>
                <input
                  type="text"
                  id="city"
                  v-model="defileCity"
                  class="form-input"
                />
              </div>

              <div class="mb-4">
                <label for="date" class="block font-semibold"
                  >Date du défilé</label
                >
                <input
                  v-model="showDate"
                  type="datetime-local"
                  id="showDate"
                  name="showDate"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="photos" class="block font-semibold"
                  >Photos du défilé</label
                >
                <input
                  type="file"
                  id="photos"
                  ref="photosInput"
                  multiple
                  class="form-input"
                  @change="onFileInputChange"
                />
              </div>
              <div class="flex space-between space-x-6 mx-6 justify-center">
                <button type="submit" class="btn-primary">
                  Créer le défilé
                </button>
                <button @click="closeFormModal" class="btn-primary">
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-0 mt-auto">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../../../supabase";
import Header from "../../components/Header.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import { watch, ref, onMounted } from "vue";

const name = ref("");
const email = ref("");
const description = ref("");
const defiles = ref([]);
const showForm = ref(false);
const showFormModal = ref(false);
const defileName = ref("");
const defileAddress = ref("");
const defileZip = ref("");
const defileCity = ref("");
const showDate = ref("");

const showCreateEventForm = () => {
  showForm.value = true;
  showFormModal.value = true;
};

const closeFormModal = () => {
  showForm.value = false;
  showFormModal.value = false;

  // Vérifier si le corps du document existe avant de manipuler ses classes
  const body = document.querySelector("body");
  if (body) {
    body.classList.remove("modal-open");
  }
};

watch(showFormModal, (value) => {
  // Ajouter ou supprimer la classe "modal-open" sur le body en fonction de l'état de la modale
  const body = document.querySelector("body");
  if (value) {
    body.classList.add("modal-open");
  } else {
    body.classList.remove("modal-open");
  }
});

const updateProfile = (event) => {
  event.preventDefault();

  // Appel à l'API ou à une méthode pour mettre à jour les informations du profil
};

const accordionState = ref({});

const toggleAccordion = (defileId) => {
  accordionState.value[defileId] = !accordionState.value[defileId];
  console.log(accordionState.value[defileId]);
};

const isAccordionOpen = (defileId) => {
  return accordionState.value[defileId] === true;
};

const onFileInputChange = (event) => {
  ref.photosInput = event.target.files;
};

onMounted(async () => {
  // Récupérer l'utilisateur connecté depuis Supabase
  const { data: user } = await supabase.auth.getUser();

  // Récupérer les défilés de l'utilisateur depuis la table "Defile" en filtrant par creator_id
  const { data: defilesData, error } = await supabase
    .from("Defile")
    .select("*")
    .eq("user_id", user.user.id);

  if (error) {
    console.error("Erreur lors de la récupération des défilés :", error);
  } else {
    defiles.value = defilesData || [];
    defilesData.forEach((defile) => {
      accordionState.value[defile.id] = false; // Initialiser l'état des accordéons à fermé
    });
  }
  const { data: compteCreateurData, dataError } = await supabase
    .from("CompteCreateur")
    .select("*")
    .eq("user_id", user.user.id);

  if (dataError) {
    console.error(
      "Erreur lors de la récupération des informations du compte créateur :",
      error
    );
  } else {
    const compteCreateur = compteCreateurData[0]; // Supposant qu'il n'y a qu'un seul compte créateur par utilisateur

    // Mettre à jour les valeurs des informations personnelles du compte créateur
    name.value = compteCreateur ? compteCreateur.name : "";
    description.value = compteCreateur ? compteCreateur.description : "";
    email.value = user.user.email || "";
  }
  console.log("defile", defiles.value);
});

const createDefile = async (event) => {
  event.preventDefault();

  // Vérifier que tous les champs sont remplis
  if (
    !defileName.value ||
    !defileAddress.value ||
    !defileZip.value ||
    !defileCity.value ||
    !showDate.value ||
    !ref.photosInput ||
    ref.photosInput.length < 2
  ) {
    console.error(
      "Veuillez remplir tous les champs et sélectionner au moins 2 photos."
    );
    return;
  }

  // // Convertir les fichiers sélectionnés en un tableau
  // const files = Array.from(formData.getAll("photosInput"));

  // try {
  //   // Envoyer les photos sur le stockage
  //   const uploadPromises = files.map((file) => uploadPhoto(file));

  //   // Attendre la fin de toutes les opérations d'upload
  //   const uploadedPhotos = await Promise.all(uploadPromises);

  //   // Créer un nouvel objet avec les informations du défilé
  //   const newDefile = {
  //     show_name: formData.get("defileName"),
  //     show_address: formData.get("defileAddress"),
  //     show_zip: formData.get("defileZip"),
  //     show_city: formData.get("defileCity"),
  //     show_date: formData.get("showDate"),
  //     show_pictures: uploadedPhotos,
  //     user_id: supabase.auth.user().id,
  //   };

  //   // Envoyer le nouvel objet à la table "defile" dans Supabase
  //   const { data, error } = await supabase.from("defile").insert([newDefile]);

  //   if (error) {
  //     console.error("Erreur lors de l'envoi du formulaire :", error);
  //     return;
  //   }

  //   console.log("Formulaire envoyé avec succès :", data);

  // Fermer la modal
  closeFormModal();
};

const deleteDefile = async (defileId) => {
  const confirmation = confirm("Voulez-vous vraiment supprimer ce défilé ?");

  if (!confirmation) {
    return;
  }

  try {
    // Supprimer le défilé de la base de données
    // console.log(defileId);
    // const { error } = await supabase
    //   .from("Defile")
    //   .delete()
    //   .eq("show_id", defileId);
    // Je veux une boucle qui supprimera les défilés pour les show_id = 1 et 2
    const { error } = await supabase.from("Defile").delete().eq("show_id", 2);
    if (error) {
      console.error("Erreur lors de la suppression du défilé :", error);
      return;
    }

    console.log("Défilé supprimé avec succès :", data);

    // Mettre à jour la liste des défilés
    defiles.value = defiles.value.filter((defile) => defile.id !== defileId);
  } catch (error) {
    console.error("Erreur lors de la suppression du défilé :", error);
  }
};

const uploadPhoto = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("storage_folder_name")
    .upload(`public/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
    throw new Error("Erreur lors de l'upload de l'image : " + error.message);
  }

  console.log("Upload réussi :", data);

  return data;
};
</script>
<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  background-color: #199153;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.defile-card {
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.text-green-500 {
  color: #10b981;
}

.text-red-500 {
  color: #ef4444;
}
.accordion-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

.accordion-content {
  display: none;
  padding-top: 8px;
}

.accordion-content p {
  margin-bottom: 8px;
}

.open {
  display: block;
}

body {
  margin: 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  width: 400px;
  max-width: 90%;
}
.modal-close-btn {
  position: absolute;
  font-size: 1.5rem;
  color: #000000;
  cursor: pointer;
}
.modal-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #888;
}

.modal-close-btn:hover {
  color: #000;
}

body.modal-open {
  overflow: hidden;
}
</style>
