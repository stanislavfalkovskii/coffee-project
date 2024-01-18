<template>
  <div class="second-page">
    <h1 class="second-page__header">Список добавленных позиций</h1>

    <button class="second-page__choice" @click="changePage">Выбор кофемашины</button>

    <div class="second-page__list" v-for="(item, index) in postStore.store" :key="index">
      <h3>{{ item.label }}, {{ item.drinks }} напитков</h3>

      <div>
        <button @click="decrementCount(index)">-</button>
        {{ item.count }}
        <button @click="incrementCount(index)">+</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../store/store';
import router from '../router/router'

const postStore = useStore();

const changePage = () => {
  router.push('/');
};

const decrementCount = (index: number) => {
  if (postStore.store[index].count > 0) {
    postStore.updateCount(index, postStore.store[index].count - 1);
  }
};

const incrementCount = (index: number) => {
  postStore.updateCount(index, postStore.store[index].count + 1);
};
</script>

<style>
  .second-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 48px;
  }

  .second-page__header {
    text-align: center;
  }

  .second-page__choice {
    align-self: center;
  }
</style>