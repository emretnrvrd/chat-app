<template>
  <v-list-item height="72" class="px-0" :value="conversation.attrs.id" @click="openConversation">
    <div class="d-flex align-center h-100">
      <div class="px-4">
        <v-avatar size="49" :image="conversation.getPhoto()"/>
      </div>
      <div class="d-flex flex-column justify-center w-100 h-100 pr-4">
        <div class="conversation-header d-flex justify-space-between">
          <span class="conversation-title font-weight-bold">{{ conversation.getTitle() }}</span>
          <span class="conversation-last-date">{{ conversation.attrs.last_date }}</span>
        </div>
        <div class="conversation-content d-flex justify-space-between">
          <span class="conversation-last-message d-inline-block text-truncate text-disabled" style="max-width: 320px; flex: auto;">{{ conversation.getLastMessage() }}</span>
        </div>
      </div>
    </div>
  </v-list-item>
</template>

<script setup>
import { useConversationStore } from "@/store/conversation";
import { toRefs } from "vue";
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const conversationStore = useConversationStore();

const props = defineProps({
  conversation: {
    type: Object,
  }
});

const { conversation } = toRefs(props);

const openConversation = () => {
  conversationStore.setSelectedConversation(conversation.value.attrs.id);
  if(mobile.value){
    conversationStore.mainDrawerShowing = false;
  }
}
</script>
