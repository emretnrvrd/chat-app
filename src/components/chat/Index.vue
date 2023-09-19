<template>
  <div v-if="conversation" class="d-flex flex-column fill-height">
    <v-toolbar elevation="0">
      <v-app-bar-nav-icon v-if="mobile" @click="conversationStore.mainDrawerShowing = true">
        <v-icon icon="mdi-chevron-left" />
      </v-app-bar-nav-icon>

      <v-app-bar-nav-icon @click="conversationStore.openInfo">
        <v-avatar size="30" :image="conversation.getPhoto()" />
      </v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold" style="cursor: pointer;" @click="conversationStore.openInfo">
        {{ conversation.getTitle() }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="conversationStore.openSeach">
        <v-icon icon="mdi-magnify" />
      </v-btn>

    </v-toolbar>

    <messages />

    <v-toolbar tag="footer" :class="{ 'toolbar-height-fix': message.attachment.length > 0 || emojiMenu} ">

      <input multiple ref="fileInput" @change="fileInputChanged" v-show="false" type="file" name="myImage" accept="image/png, image/webp, image/jpeg" />

      <div class="d-flex flex-column w-100">

        <div class="attachments pa-6" v-if="message.attachment.length > 0 || emojiMenu">
          <div v-if="message.attachment.length > 0" class="attachments-container" >
            <v-card v-for="(attachment, index) in message.attachment" :key="index" @click="message.attachment = message.attachment.filter(m => m != attachment)">
                <v-img :src="attachment" width="128" height="128"/>
                <v-btn icon size="30"  elevation="3" class="remove-file" variant="flat"> <v-icon size="16" icon="mdi-delete"/></v-btn>
            </v-card>
          </div>
        </div>

        <div class="d-flex justify-start pa-4" v-if="emojiMenu">
          <EmojiPicker class="w-50" :native="true" @select="emojiSelected"/>
        </div>

        <div class="d-flex align-center py-2 px-4">
          <v-btn icon @click="emojiMenu = !emojiMenu"> <v-icon>mdi-emoticon</v-icon> </v-btn>

          <v-btn icon @click="fileInput.click()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <form @submit.prevent="sendMessage" class="w-100">
            <v-text-field placeholder="Type message" v-model="message.content"
              variant="solo" hide-details rounded="20">

            </v-text-field>
          </form>
        </div>
      </div>

    </v-toolbar>
  </div>

  <div v-else class="w-100 h-100 d-flex justify-center align-center">
    <div class="d-flex flex-column align-center">
      <v-icon size="64" color="grey-lighten-1" icon="mdi-forum-outline" />
      <span class="text-h6 mt-5 text-grey-lighten-1">Welcome to ChatApp!</span>
    </div>
  </div>
</template>


<script setup>
import { useDisplay } from 'vuetify'
import Messages from './Messages.vue';
import { computed, ref } from 'vue';
import _ from 'lodash';
import { useConversationStore } from "@/store/conversation";
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const { mobile } = useDisplay();
const conversationStore = useConversationStore();
const conversation = computed(() => conversationStore.selectedConversation);

const emojiMenu = computed({
  get: () => conversationStore.emojiMenu,
  set: (value) => conversationStore.emojiMenu = value,
});
const message = computed({
  get: () => conversationStore.message,
  set: (value) => conversationStore.message = value
});

const fileInput = ref(null);
const fileInputChanged = async () => {
  const files = fileInput.value.files;

  if(files.length > 0){
    const convertedFiles = await conversationStore.convertFiles(files);
    for(let i = 0; i < convertedFiles.length; i++)
      message.value.attachment.push(convertedFiles[i])
  }
  fileInput.value.value = null;
}

const sendMessage = () => {
  if (_.isEmpty(message.value.content.trim()) &&  message.value.attachment.length == 0) {
    conversationStore.clearMessage();
  } else {
    conversationStore.sendMessage();
  }
  emojiMenu.value = false;
}

const emojiSelected = (emoji) => {
  message.value.content += emoji.i
}

</script>


<style>
.toolbar-height-fix .v-toolbar__content{
  height: auto!important;;
}
.attachments {
  .attachments-container{
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
  }
}
.remove-file{
  position: absolute;
  right: 0;
  top: 0;
}
</style>
