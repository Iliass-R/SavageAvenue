<template>
  <div>
    <!-- Ma navbar aura 3 liens : Nos défilés, Comment ça marche ? et Nous contacter. Les liens seront centrés au milieu de la page et la navbar aura des border et des ombres en w-full  -->
    <nav
      class="flex justify-center items-center w-full h-16 bg-white shadow-sm border-b border-gray-200 border-t drop-shadow"
    >
      <div class="flex space-x-4">
        <a
          href="/Defile"
          class="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >Nos défilés</a
        >
        <a
          href="/CommentCaMarche"
          class="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >Comment ça marche ?</a
        >
        <a
          href="/contact"
          class="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >Nous contacter</a
        >
      </div>
    </nav>
  </div>
</template>

<script setup></script>
