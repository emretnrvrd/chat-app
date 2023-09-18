import Auth from "@/models/Auth";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import Model from "@/models/Model";
import User from "@/models/User"


const runSeeder = async () => {
  await userSeeder();
  await conversationSeeder();
  await messageSeeder();


}

const userSeeder = async () => {

  const datas = [
    {
      name: 'Emre Tanrıverdi',
      photo: 'https://i.sozcucdn.com/wp-content/uploads/2022/10/19/iecrop/jeff_bezos-depophotos_16_9_1666179367.jpg',
      phone_number: '+905380236114',
      // test : 123
    },
    {
      name: 'Ahmet Aslan',
      photo: 'https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg',
      phone_number: '+905560236114',
    },
    {
      name: 'Yusuf Mert Bal',
      photo: 'https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg',
      phone_number: '+905590236114',
    }
  ];

  if(!Model.tableExists('users')){
    Model.createTable('users');
  }
  const users = User.getAll();
  datas.forEach(data => {
    let found = users.find(user => user.attrs.phone_number == data.phone_number);
    if(found){
      found.update(data);
    } else {
      let user = new User(data);
      user.create();
    }
  });

  if(!Model.tableExists('auth')){
    Model.createTable('auth');
  }
  const auths = Auth.getAll();
  if(auths.length == 0){
    const auth = new Auth({ user_id: User.getAll()[0].attrs.id });
    auth.create();
  }

}

const conversationSeeder = async () => {
  const users = User.getAll();
  const datas = [
    {
      type: 'group',
      title: 'Dostlar',
      photo: 'https://i.guim.co.uk/img/media/8ebc9096a23747566b923877f4494a802607fb98/0_370_5548_3329/master/5548.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1c17bcedd8330f71fd0f63dd3b1b4834',
      phone_number: '+905380236114',
      users: [...users.map(user => user.attrs.id)],
      last_message: 1234,
      isPinned: false,
    },
    {
      type: 'singular',
      photo: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
      phone_number: '+905380236114',
      users: [users[0], users[1]].map(user => user.attrs.id),
      last_message: 1234,
      isPinned: true,
    }
  ];

  if(!Model.tableExists('conversations')){
    Model.createTable('conversations');
  }
  const conversations = Conversation.getAll();
  if(conversations.length == 0){
    datas.forEach(data => {
        let conversation = new Conversation(data);
        conversation.create();
    });
  }

}

const messageSeeder = async () => {
  const users = User.getAll();
  const conversations = Conversation.getAll();
  const datas = [
    {
      conversation: conversations[0].attrs.id,
      user: users[0].attrs.id,
      content: 'Selam merhaba',
      sent_at: (new Date()).getTime(),
      attachments: []
    },
    {
      conversation: conversations[0].attrs.id,
      user: users[1].attrs.id,
      content: 'Selammm',
      sent_at: (new Date()).getTime(),
      attachments: []
    },
    {
      conversation: conversations[0].attrs.id,
      user: users[2].attrs.id,
      content: 'Merhabaa',
      sent_at: (new Date()).getTime(),
      attachments: []
    },
    {
      conversation: conversations[1].attrs.id,
      user: users[0].attrs.id,
      content: 'Kanka',
      sent_at: (new Date()).getTime(),
      attachments: [],
    }
  ];

  if(!Model.tableExists('messages')){
    Model.createTable('messages');
  }
  const messages = Message.getAll();
  if(messages.length == 0){
    datas.forEach(data => {
      let message = new Message(data);
      message.create();
    });
  }
}



export { runSeeder }
