import { defineStore } from 'pinia';
import axios from 'axios'

interface ICoffeeConfiguration {
  id: number;
  size: string;
  sizeLabel: string;
  drinks: string;
}

interface IStoreConfiguration {
  size: string; 
  label: string;
  drinks: string; 
  count: number;
}

export const useStore = defineStore('store', {
  state: () => ({
    currentPage: 1,
    totalPages: 2,
    store: [] as IStoreConfiguration[],
    selectedSize: 'standard',
    configurations: [] as ICoffeeConfiguration[],
  }),

  getters: {
    getConfigurations: (state) => state.configurations,
    getSizes: (state) => Array.from(new Set(state.configurations.map(config => config.size))),
    getSizeLabels: (state) => Array.from(new Set(state.configurations.map(config => config.sizeLabel))),
    getSizeDrinks: (state) => Array.from(new Set(state.configurations.map(config => config.drinks))),  
  },

  actions: {
    setCurrentPage(page: number): void {
      this.currentPage = page;
    },

    addToStore(item: { size: string, drinks: string, label: string }): void {
      const existingConfig = this.store.find(config => config.size === item.size && config.drinks === item.drinks);
    
      if (existingConfig) {
        this.updateCount(this.store.indexOf(existingConfig), existingConfig.count + 1);
      } else {
        this.store.push({ ...item, count: 1 });
      }
    },

    updateCount(index: number, count: number): void {
      this.store[index].count = count;
    },

    async fetchConfigurations() {
      try {
        const response = await axios.get('http://localhost:3000/api/configurations');
        this.configurations = response.data;
      } catch (error) {
        console.error('Error fetching configurations:', error);
      }
    },
  },
});