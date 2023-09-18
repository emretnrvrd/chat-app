<template>
  <v-list id="conversation-list" class="pa-0">
        <conversation-item v-for="conversation in conversations" :key="conversation.attrs.id" :conversation="conversation"/>
  </v-list>
</template>

<script setup>
import ConversationItem from "./ConversationItem.vue";
import { computed, onMounted, ref } from "vue";
import { useConversationStore } from "@/store/conversation";

const conversationStore = useConversationStore();
const conversations = computed(() => conversationStore.conversationMenuItems);

onMounted(() => {
  conversationStore.fetchConversationMenuItems();
})

</script>
