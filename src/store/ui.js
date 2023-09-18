// Utilities
import { defineStore } from 'pinia'

import { useDisplay } from 'vuetify'


export const useUiStore = defineStore('ui', {
  state: () => ({
      display: useDisplay()
  }),

  getters: {
    isMobile: (state) => {
      return state.display.mobile;
    }
  },

})
