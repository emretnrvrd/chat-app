
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
    conversationSidebar: false,
    conversationSidebarState: null,
    selectedUser: null,
    messagesSize: 20,
  }),

  getters: {

  },
  actions: {
    fetchConversationMenuItems() {
      const authStore = useAuthStore();
      this.conversationMenuItems = Conversation.getAll().filter(
        conversation => conversation.attrs.users.includes(authStore.authUser.attrs.id)
      );
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
      }

    },
    clearMessages(){
      this.messages = [];
    },
    async loadMessages(filters = {}, flagMessageId){

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
      console.log('loadPrevious');
      let result = [];
      if(this.messages.length > 0 ){
        result = this.messages[0].get('previous', this.messagesSize);
        this.messages = [...result, ...this.messages];
      }
      return result;
    },
    loadNext(){
      console.log('loadNext');
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
    async getMessages(filters = {}, flagMessageId = null) {

      const process = () => {
        let flagMessage = null;
        if(flagMessageId != null){
          this.clearMessages();
          flagMessage = Message.find(flagMessageId);
          this.sideType = 'both';
        } else {
          if (this.messages.length == 0) {
            flagMessage = Message.getLast(this.selectedConversation.attrs.id);
          } else {
            if (filters.side == 'previous') {
              flagMessage = this.messages[0];
            } else {
              flagMessage = this.messages[this.messages.length - 1]
            }
          }
        }


        const result = flagMessage.get(filters.side, filters.count);

        if (filters.side == 'previous') {
          this.addToPrevious(result);
        } else {
          this.addToNext(result);
          if(flagMessageId == null){
            this.scrollToBottom();
          }
        }
        return result;

      }


      return new Promise(resolve => {
        setTimeout(() => {

          resolve(process())
        }, 300)
      })




    },
    addToPrevious(messages) {
      this.messages = [...messages, ...this.messages];
    },
    addToNext(messages) {
      this.messages = [...this.messages, ...messages];
    },
    addNewMessage(data) {
      const message = new Message({
        user: data.user.attrs.id,
        conversation: data.conversation.attrs.id,
        content: data.content,
        attachment: [],
        sent_at: (new Date()).getTime()
      });
      message.create();
      message.loadUser();
      this.messages.push(message);
      this.scrollToBottom('smooth');
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
