<template>
  <v-toolbar>
    <v-app-bar-nav-icon @click="conversationStore.closeSidebar">
      <v-icon icon="mdi-chevron-left" />
    </v-app-bar-nav-icon>
    <h6 class="text-h6 ml-4">{{ title }}</h6>
  </v-toolbar>
</template>

<script setup>
import { useConversationStore } from "@/store/conversation";
const conversationStore = useConversationStore();

const props = defineProps({
  title: { type: String, default: ''}
})

</script>
