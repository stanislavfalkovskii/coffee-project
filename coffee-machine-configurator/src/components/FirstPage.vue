<template>
  <div class="first-page">
    <h1>Конфигуратор кофемашины</h1>

    <button @click="changePage">Список выбранных машин</button>

    <div>
      <label v-for="(item, index) in sizeLabels">
        <input 
          type="radio" 
          v-model="selectedSize" 
          :value="sizes[index]" 
          @change="changeLabel(index)"
        >
        {{ item }}
      </label>
    </div>

    <div>
      <label v-for="item in drinks">
        <input type="radio" v-model="selectedDrinks" :value="item">
        {{ item }} напитков
      </label>
    </div>

    <h2>Выбранные опции: {{ selectedLabel }}, {{ selectedDrinks }} напитков</h2>

    <div>
      <img src="../assets/coffee.png" :width="sizeText" alt="Coffee Machine Image" />
    </div>

    <button @click="addToStore">Добавить в хранилище</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from "../store/store";
import router from '../router/router'

const postStore = useStore();

const sizes = computed(() => postStore.getSizes);
const drinks = computed(() => postStore.getSizeDrinks);
const sizeLabels = computed(() => postStore.getSizeLabels);

const selectedSize = ref('');
const selectedDrinks = ref('');
const selectedLabel = ref('');

const sizeText = computed(() => (selectedSize.value === 'standard') ? '128px' : '256px')

const changePage = () => {
  router.push('secondPage');
};

const changeLabel = (index: number) => selectedLabel.value = sizeLabels.value[index];

const addToStore = () => postStore.addToStore({ 
    size: selectedSize.value,
    drinks: selectedDrinks.value,
    label: selectedLabel.value,
  });

onMounted(async () => {
  await postStore.fetchConfigurations();
  selectedSize.value = sizes.value[0];
  selectedDrinks.value = drinks.value[0];
  selectedLabel.value = sizeLabels.value[0];
});
</script>

<style>
  .first-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 48px;
  }
</style>