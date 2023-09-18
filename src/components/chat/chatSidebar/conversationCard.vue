<template>
  <div class="d-flex justify-space-between align-center" @click="select">
    <div class="d-flex align-center">
      <v-avatar size="36" :image="conversation.attrs.photo"/>
      <div>
        <span class="text-body ml-3">{{ conversation.attrs.title }}</span>
      </div>
    </div>
    <v-icon icon="mdi-chevron-right"/>
  </div>

</template>

<script setup>
import { toRefs } from "vue"
import { useConversationStore } from "@/store/conversation";
const conversationStore = useConversationStore();

const props = defineProps({
  conversation: {
    type: Object
  }
})

const select = () => {
  conversationStore.closeSidebar();
  conversationStore.setSelectedConversation(conversation.value.attrs.id);
}


</script>
