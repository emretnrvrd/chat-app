
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import _ from 'lodash';
import User from '@/models/User';


export const useConversationStore = defineStore('conversations', {

  state: () => ({
    conversationMenuItems: [],
    selectedConversation: null,
    sideType: 'start',
    messages: [],
    message: {
      content: '',
      attachment: [],
    },
    emojiMenu: false,
    conversationSidebar: false,
    conversationSidebarState: null,
    selectedUser: null,
    messagesSize: 20,
    mainDrawerShowing: true,
  }),

  getters: {

  },
  actions: {
    fetchConversationMenuItems() {
      const authStore = useAuthStore();
      const conversations = Conversation.getAll().filter(
        conversation => conversation.attrs.users.includes(authStore.authUser.attrs.id)
      );
      conversations.forEach(conversation => { conversation.loadUsers(); conversation.loadLastMessage();});
      this.conversationMenuItems =  _.orderBy(conversations, (conversation) => {
        return conversation.relations.last_message?.attrs?.sent_at ?? 0;
      }, ['desc']);
    },
    setSelectedConversation(id) {
      this.closeSidebar();
      this.selectedConversation = null;
      if(id){
        this.selectedConversation = Conversation.find(id);
        this.selectedConversation.loadUsers();
        this.clearMessages();
        this.loadLastMessages();
        this.scrollToBottom();
        this.emojiMenu = false;
      }

    },
    clearMessages(){
      this.messages = [];
    },
    async loadLastMessages(){
      const flagMessage = Message.getLast(this.selectedConversation.attrs.id);
      if(flagMessage){
        const result = flagMessage.get('previous', this.messagesSize, true);
        this.messages = result;
        this.sideType = 'start'
        return result;
      }
      return [];
    },
    loadPrevious(){
      let result = [];
      if(this.messages.length > 0 ){
        result = this.messages[0].get('previous', this.messagesSize);
        this.messages = [...result, ...this.messages];
      }
      return result;
    },
    loadNext(){
      let result = [];
      if(this.messages.length > 0 ){
        result = this.messages[this.messages.length-1].get('next', this.messagesSize);
        this.messages = [...this.messages, ...result];
      }
      return result;
    },
    loadFromMessage(messageId){
      this.sideType = 'both'
      this.clearMessages();
      const flagMessage = Message.find(messageId);
      const result = flagMessage.get('both', this.messagesSize, true);
      this.messages = result;
      this.focusToMessage(messageId);
    },
    sendMessage() {
      const authStore = useAuthStore();
      const message = new Message({
        ...this.message,
        user: authStore.authUser.attrs.id,
        conversation: this.selectedConversation.attrs.id,
        sent_at: (new Date()).getTime()
      });
      message.create();
      message.loadUser();
      this.messages.push(message);
      this.scrollToBottom('smooth');
      this.clearMessage();
      this.fetchConversationMenuItems();
    },
    clearMessage(){
      this.message.content = '';
      this.message.attachment = [];
    },
    async convertFiles(files){
      const convertedFiles = [];
      for(let i = 0; i < files.length; i++){
        try{
          convertedFiles.push(await this.toBase64(files[i]));
        } catch(e) {
          console.error(e);
        }
      }
      return convertedFiles;
    },
    async toBase64 (file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      })
    },
    scrollToBottom(behavior = undefined) {
      setTimeout(() => {
        let element = document.getElementById("messages");
        element.scroll({ top: element.scrollHeight, behavior: behavior });
      }, 100);
    },
    focusToMessage(messageId) {
      setTimeout(() => {
        let element = document.querySelector(`[data-id=message-${messageId}]`);
        if(element) {
          element.scrollIntoView();

          let highlightElement = document.querySelector(`[data-id=message-${messageId}] .content-wrapper`);
          highlightElement.classList.toggle('bg-primary');
          highlightElement.classList.toggle('bg-secondary');
          setTimeout(() => {
            highlightElement.classList.toggle('bg-primary');
            highlightElement.classList.toggle('bg-secondary');
          }, 3000)
        }

      }, 500);
    },
    openInfo() {
      this.closeSidebar();
      this.conversationSidebar = true;
      this.conversationSidebarState = 'info';
    },
    openUserInfo(userId) {
      this.closeSidebar();
      this.selectedUser = User.find(userId);
      this.conversationSidebarState = 'userInfo';
      this.conversationSidebar = true;
    },
    openSeach() {
      this.closeSidebar();
      this.conversationSidebarState = 'search';
      this.conversationSidebar = true;
    },

    closeSidebar() {
      this.conversationSidebar = false;
      this.conversationSidebarState = null;
      this.selectedUser = null;
    }
  }

})
