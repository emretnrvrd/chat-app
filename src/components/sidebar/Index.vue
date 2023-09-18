<template>
  <v-navigation-drawer v-model="drawerState" :width=" mobile ? '100vw' : '480'" class="p-0">

    <div>
      <toolbar />
      <search />
      <conversations />
    </div>


  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import Conversations from './conversations';
import Toolbar from './toolbar';
import Search from './search';
import { useConversationStore } from "@/store/conversation";
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay();

const conversationStore = useConversationStore();
const drawerState = computed(()=> !conversationStore.selectedConversation);
</script>
