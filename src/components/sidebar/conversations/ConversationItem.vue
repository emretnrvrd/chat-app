<template>
  <v-list-item height="72" class="px-0" :value="conversation.attrs.id" @click="openConversation">
    <div class="d-flex align-center h-100">
      <div class="px-4">
        <v-avatar size="49" :image="conversation.attrs.photo"/>
      </div>
      <div class="d-flex flex-column justify-center w-100 h-100 pr-4">
        <div class="conversation-header d-flex justify-space-between">
          <span class="conversation-title font-weight-bold">{{ title }}</span>
          <span class="conversation-last-date">{{ conversation.attrs.last_date }}</span>
        </div>
        <div class="conversation-content d-flex justify-space-between">
          <span class="conversation-last-message d-inline-block text-truncate" style="max-width: 320px; flex: auto;">{{ lastMessage }}</span>
          <conversation-menu :convesation="conversation" />
        </div>
      </div>
    </div>
  </v-list-item>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useConversationStore } from "@/store/conversation";
import ConversationMenu from "./ConversationMenu.vue";
import { computed, toRefs } from "vue";

const authStore = useAuthStore();
const conversationStore = useConversationStore();

const props = defineProps({
  conversation: {
    type: Object,
  }
});

const { conversation } = toRefs(props);
const title = computed(() => {
  if(conversation.value.isGroup()){
    return conversation.value.attrs.title;
  } else {
    conversation.value.loadUsers();
    return conversation.value.relations.users.find(user => user.attrs.id != authStore.authUser.attrs.id).attrs.name;
  }
});

const lastMessage = computed(() => {
  return 'Ahmet: HEllo';
})


const openConversation = () => {
  conversationStore.setSelectedConversation(conversation.value.attrs.id);
}
</script>
