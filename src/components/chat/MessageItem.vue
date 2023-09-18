<template>
  <div class="d-flex w-100 my-1" :class="{ 'justify-end': messageIsMine }">
    <div style="max-width: 60%;">
      <div class="content-wrapper d-inline-block bg-white elevation-3 rounded-lg px-4 py-2 ml-4"
        :class="{ 'bg-secondary': messageIsMine }">

        <div class="d-flex">
          <div>
            <div v-if="!messageIsMine" class="text-subtitle-2 font-weight-bold mb-1" @click="conversationStore.openUserInfo(message.relations.user.attrs.id)" style="cursor: pointer;">
              {{ message.relations.user.attrs.name}}
            </div>
            <div class="text-body-2"> {{ message.attrs.content }}</div>
          </div>
          <div class="ml-4 d-flex align-end">
            <div class="text-right text-disabled" style="font-size: 12px!important; margin-bottom: -4px;">12:20</div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useConversationStore } from "@/store/conversation";
const conversationStore = useConversationStore();


const props = defineProps({
  message: {
    type: Object,
  },
  messageIsMine: {
    type: Boolean
  }
})

const { message, messageIsMine } = toRefs(props);


</script>
