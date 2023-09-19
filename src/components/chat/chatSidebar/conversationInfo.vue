<template>
  <sidebar-toolbar title="Conversation Information"/>
    <v-row>
      <v-col cols="12" >
        <v-card elevation="1" rounded="0">
          <div class="d-flex flex-column justify-center align-center" style="min-height: 300px;">
              <v-avatar size="128" :image="selectedConversation.attrs.photo"/>
              <div class="text-h4 mt-4">{{ selectedConversation.getTitle() }}</div>
              <div class="text-body mt-4" v-if="selectedConversation.isGroup()">{{ participants.length }} participants</div>
              <div class="text-body-2 mt-1 text-disabled" v-if="!selectedConversation.isGroup()">{{ participants[0].attrs.phone_number }}</div>

          </div>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="selectedConversation.isGroup()">
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

      <v-col cols="12">
        <v-card elevation="1" rounded="0">
          <v-card-title>Medias</v-card-title>
        <v-divider></v-divider>

          <v-row class="pa-4" v-if="medias.length >0">
            <v-col cols="4" v-for="(media, index) in medias" :key="index" :value="media">
              <v-card class="d-flex justify-center align-center w-100 h-100" @click="conversationStore.loadFromMessage(media.message_id)">
                <v-img width="80" height="80" :src="media.attachment"></v-img>
              </v-card>
            </v-col>
          </v-row>

          <div v-else class="d-flex align-center justify-center" style="min-height: 100px;">
              No media
          </div>

        </v-card>
      </v-col>
    </v-row>
</template>


<script setup>
import { computed } from "vue";
import { useConversationStore } from "@/store/conversation";
import userCard from "./userCard.vue";
import sidebarToolbar from "./sidebarToolbar.vue";
import Message from "@/models/Message";


const conversationStore = useConversationStore();
const selectedConversation = computed(() => conversationStore.selectedConversation);



const participants = computed(() => {
  return selectedConversation.value.relations.users ?? [];
})

const medias = computed(() => {
  let messages = Message.fromConversation(selectedConversation.value.attrs.id).filter(message => message.attrs?.attachment?.length > 0);

  let attachments = [];
  for(let i=0; i < messages.length; i++) {
    attachments.push(...messages[i].attrs.attachment.map((attachment) => {
        return {
          message_id: messages[i].attrs.id,
          sent_at: messages[i].attrs.sent_at,
          attachment: attachment
        }
    }));
  }
  return attachments;
});


</script>
