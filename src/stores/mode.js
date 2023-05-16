import { defineStore } from 'pinia'

export default defineStore('mode', {
  state: () => {
    return {
      mode: 2,
    };
  },
  persist: true,
})