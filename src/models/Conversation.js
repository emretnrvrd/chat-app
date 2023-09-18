
import Model from "./Model";
import User from "./User";
export default class Conversation extends Model  {
  tableName(){
      return 'conversations';
  }


  loadUsers(){
    if(!this.relations.users){
      this.relations.users =  User.getAll().filter(user => this.attrs.users.includes(user.attrs.id));
    }
  }

  isGroup(){
    return this.attrs.type == 'group';
  }

}
