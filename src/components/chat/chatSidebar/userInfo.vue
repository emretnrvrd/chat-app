<template>
  <sidebar-toolbar title="User Information" />
  <v-row>
    <v-col cols="12">
      <v-card elevation="1" rounded="0">
        <div class="d-flex flex-column justify-center align-center" style="min-height: 300px;">
          <v-avatar size="128" :image="selectedUser.attrs.photo" />
          <div class="text-h4 mt-4">{{ selectedUser.attrs.name }}</div>
          <div class="text-body-2 mt-1 text-disabled">{{ selectedUser.attrs.phone_number }}</div>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <v-card elevation="1" rounded="0">
        <v-card-title>Shared Conversations</v-card-title>
        <v-divider></v-divider>

        <v-list class="py-0">
          <v-list-item class="py-3" v-for="conversation in sharedConversations" :key="conversation.attrs.id"
            :value="conversation.attrs.id">
              <conversation-card :conversation="conversation"/>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>


<script setup>
import { computed, onMounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";
import sidebarToolbar from "./sidebarToolbar.vue";
import Conversation from "@/models/Conversation";
import conversationCard from "./conversationCard.vue";

const authStore = useAuthStore();
const conversationStore = useConversationStore();


const { selectedUser, selectedConversation } = storeToRefs(conversationStore);


const sharedConversations = computed(() => {
   return Conversation.getAll().filter(conversation => {
      return conversation.isGroup() &&
        conversation.attrs.users.includes(authStore.authUser.attrs.id) &&
        conversation.attrs.users.includes(selectedUser.value.attrs.id)
  });
})









</script>
