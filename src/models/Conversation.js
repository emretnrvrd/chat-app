
import Message from "./Message";
import Model from "./Model";
import User from "./User";
import { useAuthStore } from "@/store/auth";
export default class Conversation extends Model  {
  tableName(){
      return 'conversations';
  }


  loadUsers(){
    if(!this.relations.users){
      this.relations.users =  User.getAll().filter(user => this.attrs.users.includes(user.attrs.id));
    }
  }

  loadLastMessage(){
    if(!this.relations.last_message){
      this.relations.last_message =  Message.find(this.attrs.last_message);
    }
  }

  getAnotherUser(){
    if(!this.relations.users){
      this.loadUsers();
    }
    const authStore = useAuthStore();
    return this.relations.users.find(user => user.attrs.id != authStore.authUser.attrs.id)
  }

  getTitle(){
    if(this.isGroup()){
        return this.attrs.title;
    } else {
      return this.getAnotherUser().attrs.name;
    }
  }

  getLastMessage(){
    this.loadLastMessage();
    const lastMessage = this.relations.last_message;
    if(lastMessage){
      const authStore = useAuthStore();
      const messager = lastMessage.loadUser();
      const content = lastMessage.attrs.content.trim() == '' ? '(attachment)' : lastMessage.attrs.content;
      if(messager.attrs.id == authStore.authUser.attrs.id) {
        return `Me: ${content}`;
      } else {
        return `${messager.attrs.name}: ${content}`;
      }
    }
    return null;
  }

  isGroup(){
    return this.attrs.type == 'group';
  }

  getPhoto(){
    if(this.isGroup()){
      return this.attrs.photo;
    } else {
      return this.getAnotherUser().attrs.photo;
    }
  }
}
