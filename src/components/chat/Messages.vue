<template>

  <v-infinite-scroll id="messages" height="100%" :side="conversationStore.sideType" :onLoad="load" class="pa-8">
    <message-item
      v-for="message in messages"
      :key="message.attrs.id"
      :message="message"
      :messageIsMine="authStore.authUser.attrs.id == message.attrs.user"
      :data-id="'message-' + message.attrs.id"
    />
    <template v-slot:empty/>

  </v-infinite-scroll>

</template>


<script setup>
import { computed, onMounted, ref } from 'vue';
import MessageItem from './MessageItem.vue';
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll'
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";

const conversationStore = useConversationStore();
const authStore = useAuthStore();
const messages = computed(() => conversationStore.messages);
const messageElements = ref(null);


const load = async ({ done, side }) => {

  // let filters = {
  //   side: side == 'start' ? 'previous' : 'next',
  //   count: 10
  // }

  // const result = await conversationStore.getMessages(filters);



  let result = [];
  if(side == 'start'){
    result = conversationStore.loadPrevious();
  }
  if(side == 'end') {
    result = conversationStore.loadNext();
  }

  console.log('result messages', result);
  if(result.length == 0){
    return done('empty');
  } else {
    return done('ok');
  }

}

</script>


<style lang="scss" scoped>
#messages{
  background: #f0e6df url("@/assets/bg-chat.png")  ;
}
</style>

