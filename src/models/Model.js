import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default class Model {
  constructor(data={}){
    this.tableName = this.tableName();
    this.attrs = data
    this.relations= {};
  }

  create(){
    const table = Model.getTable(this.tableName);
    this.attrs = { id: uuidv4(), ...this.attrs};
    table.push(this.attrs);
    Model.setTable(this.tableName, table);
    return this;
  }
  update(attrs){
    attrs.id ? delete attrs['id'] : null;
    this.attrs = { ...this.attrs, ...attrs};

    const table = Model.getTable(this.tableName);
    let index = table.findIndex(item => item.id == this.attrs.id);
    table[index] = this.attrs;
    Model.setTable(this.tableName, table);
  }

  delete(){
    const table = Model.getTable(this.tableName);
    const model = table[this.attrs.id] ?? null;
    if(model) {
      delete table[this.attrs.id];
    }
  }

  static tableExists(tableName){
    return !!localStorage.getItem(tableName);
  }
  static getTable(tableName){
    return JSON.parse(localStorage.getItem(tableName));
  }
  static setTable(tableName, data) {
    localStorage.setItem(tableName, JSON.stringify(data));
  }
  static createTable(tableName) {
    Model.setTable(tableName, []);
  }
  static getAll(){
    const table = Model.getTable((new this()).tableName);
    return table.map(item => new this(item));
  }

  static find(id){
    const table = Model.getTable((new this()).tableName);
    let found =  table.find(item => item.id == id);
    if(found){
      return new this(found);
    }
    return null;
  }


}
