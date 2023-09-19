<template>
  <v-navigation-drawer v-model="conversationStore.mainDrawerShowing" width="480" class="p-0">

    <div>
      <toolbar />
      <v-divider></v-divider>
      <conversations />
    </div>


  </v-navigation-drawer>

</template>

<script setup>
import Conversations from './conversations/index.vue';
import Toolbar from './toolbar/index.vue';
import { useConversationStore } from "@/store/conversation";
const conversationStore = useConversationStore();

</script>
