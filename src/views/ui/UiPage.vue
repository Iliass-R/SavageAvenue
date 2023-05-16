<template>
    <div class="w-full flex flex-col pb-10 border-b border-slate-700 px-5">
				<div class="py-5">
					<p class="text-2xl font-bold">Buttons</p>
					<p>Liste des buttons disponibles</p>
				</div>
                    <div class="ui-section">
                            <p>Button Primary</p>
                            <PrimaryButton text="Primary Button" />
                    </div>
    </div>
    <div class="w-full flex flex-col pb-10 border-b border-slate-700 px-5">
				<div class="py-5">
					<p class="text-2xl font-bold">Error Messages</p>
					<p>Un error message disponible</p>
				</div>
                    <div class="ui-section">
                            <ErrorMessage text="Veuillez renseigner des adresses mails identiques" />
                    </div>
    </div>
    <div class="w-full flex flex-col pb-10 border-b border-slate-700 px-5">
				<div class="py-5">
					<p class="text-2xl font-bold">Input</p>
					<p>Liste des inputs disponibles</p>
				</div>
                <div class="ui-section">
                        <p>Input Default</p>
                        <InputDefault label="Email" placeholder="Email" id="ui-input-default"/>
                    </div>
    </div>
</template>

<script setup>
import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
import ErrorMessage from '../../components/messages/ErrorMessage.vue';
import InputDefault from '../../components/inputs/InputDefault.vue';
</script>

<style scoped>
.ui-section {
	@apply p-5;
}
</style>
