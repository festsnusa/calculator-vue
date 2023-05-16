import { defineStore } from 'pinia'

export default defineStore('mode', {
  state: () => {
    return {
      mode: 1,
    };
  },
  persist: true,
})