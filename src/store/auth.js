// Utilities
import Auth from '@/models/Auth';
import User from '@/models/User';
import { defineStore } from 'pinia'
import { useConversationStore } from './conversation';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  getters: {
    authUser: (state) => {
      return state.user;
    }
  },
  actions: {
    setUser(userId){
      const conversationStore = useConversationStore();
      const user = User.find(userId);
      const auth = Auth.getAll()[0];

      if(user && auth){
        auth.update({'user_id': user.attrs.id});
        this.user = user;
        conversationStore.fetchConversationMenuItems();
      }
    },
  }

})
