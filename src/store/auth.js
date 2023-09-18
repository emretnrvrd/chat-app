// Utilities
import User from '@/models/User';
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
  state: () => ({
  }),

  getters: {
    authUser: () => {
      return User.find(JSON.parse(localStorage.getItem('auth'))[0].user_id);
    }
  },
  action: {
    switchUser(id){
      this.user = id;
    }
  }

})
