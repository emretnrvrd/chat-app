<template>

    <div v-if="conversation" class="d-flex flex-column fill-height">
      <v-toolbar

        elevation="0"
      >
      <v-app-bar-nav-icon v-if="mobile" @click="conversationStore.setSelectedConversation(null)">
        <v-icon icon="mdi-chevron-left"/>
      </v-app-bar-nav-icon>

      <v-app-bar-nav-icon @click="conversationStore.openInfo">
        <v-avatar size="30" :image="conversation.attrs.photo"/>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold" @click="conversationStore.openInfo">{{ conversation.attrs.title }}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="conversationStore.openSeach">
        <v-icon icon="mdi-magnify"/>
      </v-btn>

      <conversation-menu :conversation="{}" icon="mdi-dots-vertical" as-button/>
      </v-toolbar>

      <messages/>


      <v-toolbar tag="footer" class="pr-4">
        <v-btn icon @click="saveMessage">
          <v-icon>mdi-emoticon</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <form @submit.prevent="sendMessage" class="w-100">
          <v-text-field
              v-bind:class="['elevation-0', 'rounded-lg']"
              placeholder="Type message"
              v-model="message"
              variant="solo"
              hide-details

              rounded="20"
            >

          </v-text-field>
        </form>

      </v-toolbar>
    </div>


    <div v-else class="w-100 h-100 d-flex justify-center align-center">
      <div class="d-flex flex-column align-center">
        <v-icon size="64" color="grey-lighten-1" icon="mdi-forum-outline"/>
        <span class="text-h6 mt-5 text-grey-lighten-1">Welcome to ChatApp!</span>
      </div>
    </div>

</template>


<script setup>
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay();
import Messages from './Messages.vue';
import { computed, onMounted, ref, watch } from 'vue';
import _ from 'lodash';
import User from '@/models/User';
import ConversationMenu from '../sidebar/conversations/ConversationMenu.vue';
import { storeToRefs } from 'pinia';
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const conversationStore = useConversationStore();
const conversation = computed(() => conversationStore.selectedConversation);


const message = ref('');


const sendMessage = () => {
  if(_.isEmpty(message.value.trim())){
    message.value = '';
    return;
  }
  conversationStore.addNewMessage({
    user: authStore.authUser,
    conversation: conversationStore.selectedConversation,
    content: message.value
  });
  message.value = '';
}



const saveMessage = () => {
  const user = new User({
    name: 'Emre',
    message: message.value
  });

  user.create();
}
</script>
