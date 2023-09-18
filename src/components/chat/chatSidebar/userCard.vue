<template>
  <div class="d-flex justify-space-between align-center" @click="select">
    <div class="d-flex align-center">
      <v-avatar size="36" :image="user.attrs.photo"/>
      <div>
        <span class="text-body ml-3">{{ user.attrs.name }}</span>
        <br>
        <span class="text-body-2 ml-3 text-disabled">{{ user.attrs.phone_number }}</span>
      </div>
    </div>
    <v-icon icon="mdi-chevron-right"/>
  </div>

</template>

<script setup>
import { toRefs } from "vue"
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
const conversationStore = useConversationStore();

const props = defineProps({
  user: {
    type: Object
  }
})

const select = () => {
  if(authStore.authUser.attrs.id != props.user.attrs.id){
    conversationStore.openUserInfo(props.user.attrs.id);
  }
}

</script>
