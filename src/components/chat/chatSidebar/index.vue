<template>
  <v-navigation-drawer v-model="conversationSidebar" location="right" width="480" class="p-0">

    <div v-if="conversationSidebarState == 'info'">
      <conversation-info/>
    </div>
    <div v-else-if="conversationSidebarState == 'userInfo'">
      <user-info/>
    </div>
    <div v-else-if="conversationSidebarState == 'search'">
      <search/>
    </div>


  </v-navigation-drawer>
</template>


<script setup>
import { useConversationStore } from "@/store/conversation";
import conversationInfo from "./conversationInfo.vue";
import userInfo from "./userInfo.vue";
import search from "./search";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const conversationStore = useConversationStore();


const conversationSidebar = computed(() => conversationStore.conversationSidebar);
const conversationSidebarState = computed(() => conversationStore.conversationSidebarState);
const conversationSelectedUser = computed(() => conversationStore.selectedUser);

</script>
