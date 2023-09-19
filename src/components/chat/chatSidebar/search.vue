<template>
  <sidebar-toolbar title="Search" />
  <v-row>
    <v-col cols="12">
      <v-toolbar class="py-2 px-3">
        <v-text-field v-model="searchText" placeholder="Search" variant="solo" hide-details class="elevation-0 py-10" @keypress="debounceSearch">
          <template v-slot:prepend-inner>
            <v-btn v-if="true" icon disabled>
              <v-icon icon="mdi-magnify" />
            </v-btn>
            <v-btn v-else icon @click="null">
              <v-icon icon="mdi-chevron-left" />
            </v-btn>
          </template>
        </v-text-field>
      </v-toolbar>
    </v-col>
    <v-col>
      <v-card elevation="1" rounded="0">
        <v-card-title>Results</v-card-title>
        <v-divider></v-divider>

        <v-list class="py-0" v-if="results.length > 0">
          <v-list-item class="py-3 border-bottom"
            v-for="result in results"
            :key="result.original.attrs.id"
            :value="result.original.attrs.id"
            @click="goMessage(result.original.attrs.id)">
            <div>
              <div class="text-body font-weight-bold ">{{ result.original.relations.user.attrs.name }}</div>
              <p class="text-disabled mt-2" v-html="result.content"></p>
              <div class="text-body-2 text-disabled text-right">{{ moment(result.original.attrs.sent_at).format('lll') }}</div>

            </div>
          </v-list-item>
        </v-list>
        <div v-else class="d-flex justify-center py-16">
          No result
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>


<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";
import sidebarToolbar from "./sidebarToolbar.vue";
import _ from "lodash";
import Message from "@/models/Message";
import moment from "moment";

const authStore = useAuthStore();
const conversationStore = useConversationStore();
const { conversationSidebar, conversationSidebarState } = storeToRefs(conversationStore);
const selectedConversation = computed(() => conversationStore.selectedConversation);

const searchText = ref('');
const results = ref([]);


const highlightMessage = (original, replace) => {
  let result = original.replace(replace, '<span class="bg-primary">' + replace + '</span>')
  return result;
}

const search = async () => {
  let messages =  Message.fromConversation(selectedConversation.value.attrs.id).
    filter(message => message.attrs.content.toString().includes(searchText.value)).
    map(message => {
      return {
        original: message,
        content: highlightMessage(message.attrs.content, searchText.value)
      }
    });
  messages = _.orderBy(messages, (m)=> m.original.attrs.sent_at, 'desc');
  results.value = messages;
}

const debounceSearch = _.debounce(async function () {
    await search();
}, 500);

const goMessage = (messageId) => {
  conversationStore.loadFromMessage(messageId);
  conversationStore.closeSidebar();
}

</script>
