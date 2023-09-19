<template>
  <div class="d-flex w-100 my-3" :class="{ 'justify-end': messageIsMine }">
    <v-avatar v-if="!messageIsMine" size="36" :image="message.relations.user.attrs.photo" />

    <div style="max-width: 75%;">
      <div class="content-wrapper d-inline-block bg-white elevation-3 rounded-lg px-4 py-2 ml-4"
        :class="{ 'bg-secondary': messageIsMine }">


        <div v-if="message.attrs.attachment?.length > 0" class="text-body-2 ma-2 mb-4">
              <v-row justify="space-evenly">
                <v-col cols="12"
                  :sm="message.attrs.attachment.length == 1 ? 12 : calculateColSize(6) "
                  :md="message.attrs.attachment.length == 1 ? 12 : calculateColSize(4) "
                  :lg="message.attrs.attachment.length == 1 ? 12 : calculateColSize(3) "
                  v-for="(attachment, index) in message.attrs.attachment"
                  :key="index"
                  class="d-flex justify-center">
                    <v-card class="w-100">
                        <v-img :src="attachment"  height="128" width="128"  />
                    </v-card>
                </v-col>
              </v-row>

            </div>
        <div class="d-flex justify-end">
          <div>
            <div v-if="!messageIsMine" class="text-subtitle-2 font-weight-bold mb-1" @click="conversationStore.openUserInfo(message.relations.user.attrs.id)" style="cursor: pointer;">
              {{ message.relations.user.attrs.name}}
            </div>

            <div class="text-body-2"> {{ message.attrs.content }}</div>

          </div>
          <div class="ml-4 d-flex align-end">
            <div class="text-right text-disabled" style="font-size: 12px!important; margin-bottom: -4px; white-space: nowrap;">{{ moment(message.attrs.sent_at).format('LT') }}</div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import { toRefs } from 'vue';
import { useConversationStore } from "@/store/conversation";
import Message from '@/models/Message';
const conversationStore = useConversationStore();


const props = defineProps({
  message: {
    type: Message,
  },
  messageIsMine: {
    type: Boolean
  }
})

const { message, messageIsMine } = toRefs(props);

const calculateColSize = (def) => {
  if(message.value?.attachment?.length >= 12 / def){
    return def;
  } else {
    return 'auto'
  }
}
</script>
