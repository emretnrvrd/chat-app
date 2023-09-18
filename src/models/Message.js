
import { result } from "lodash";
import Model from "./Model";
import User from "./User";
import { v4 as uuidv4 } from 'uuid';

export default class Message extends Model  {
  tableName(){
      return 'messages';
  }

  loadUser(){
    this.relations.user =  User.find(this.attrs.user);
  }

  static fromConversation(conversationId){
    return Message.getAll().filter(message => message.attrs.conversation == conversationId).map(message => {
      message.loadUser();
      return message;
    });
  }

  create(){
    let lastMessage = Message.getAll().find(message => message.attrs.conversation == this.attrs.conversation && message.attrs.next == null)
    console.log('lastMessage', lastMessage);
    if(lastMessage){
      this.attrs.next = null;
      this.attrs.previous = lastMessage.attrs.id;
      let createdMessage = super.create();

      lastMessage.update({ next: this.attrs.id })
    } else {
      this.attrs.next = null;
      this.attrs.previous = null;
      super.create();
    }
  }

  get(side = 'previous', count, includeSelf = false){
    let result = [ ];

    if(includeSelf || side == 'both'){
      result = [this];
    }
    // let currentMessage = this;


    const loadOnePrevious = (message) => {
      let previous =  message.previous();
      if(previous){
        result = [previous].concat(result);
      }
      return previous;
    }

    const loadOneNext = (message) => {
      let next =  message.next();
      if(next){
        result.push(next);
      }
      return next;
    }

    if(side == 'previous') {
      let current = this;
      for(let i = 0; i < count; i++) {
        let previous = loadOnePrevious(current)
        if(previous) current = previous;
        else break;
      }
    }
    if(side == 'next') {
      let current = this;
      for(let i = 0; i < count; i++) {
        let next = loadOneNext(current)
        if(next) current = next;
        else break;
      }
    }
    if(side == 'both') {
      while(result.length < count){

        let previous = loadOnePrevious(result[0]);
        if(result.length >= count) break;
        let next = loadOneNext(result[result.length-1])
        if(result.length >= count) break;

        console.log(previous, next);
        if(!previous && !next){
          break;
        }
      }

    }

    return result;

  }

  static getLast(conversationId){
    return Message.fromConversation(conversationId).find(message => message.attrs.next == null);
  }

  next(){
    return Message.fromConversation(this.attrs.conversation).find(message => message.attrs.id == this.attrs.next) ?? null;
  }
  previous(){
    return Message.fromConversation(this.attrs.conversation).find(message => message.attrs.id == this.attrs.previous) ?? null;
  }

}
