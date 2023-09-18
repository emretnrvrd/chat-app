<template>
  <sidebar-toolbar title="Conversation Information"/>
    <v-row>
      <v-col cols="12" >
        <v-card elevation="1" rounded="0">
          <div class="d-flex flex-column justify-center align-center" style="min-height: 300px;">
              <v-avatar size="128" :image="selectedConversation.attrs.photo"/>
              <div class="text-h4 mt-4">{{ title }}</div>
              <div class="text-body mt-4" v-if="selectedConversation.isGroup()">{{ participants.length }} participants</div>
              <div class="text-body-2 mt-1 text-disabled" v-if="!selectedConversation.isGroup()">{{ participants[0].attrs.phone_number }}</div>

          </div>
        </v-card>
      </v-col>
      <v-col v-if="selectedConversation.isGroup()">
        <v-card elevation="1" rounded="0">
          <v-card-title>Participants</v-card-title>
        <v-divider></v-divider>

          <v-list class="py-0">
            <v-list-item class="py-3" v-for="participant in participants" :key="participant.attrs.id" :value="participant.attrs.id">
              <user-card :user="participant"/>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
</template>


<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";
import userCard from "./userCard.vue";
import sidebarToolbar from "./sidebarToolbar.vue";

const authStore = useAuthStore();
const conversationStore = useConversationStore();
const { conversationSidebar, conversationSidebarState} = storeToRefs(conversationStore);
const selectedConversation = computed(() => conversationStore.selectedConversation);

const title = computed(() => {
  if(selectedConversation.value.isGroup()){
    return selectedConversation.value.attrs.title;
  } else {
    return participants.value.find(user => user.attrs.id != authStore.authUser.attrs.id).attrs.name;
  }
});

// const participants = ref([]);

const participants = computed(() => {
  return selectedConversation.value.relations.users ?? [];
})


</script>
