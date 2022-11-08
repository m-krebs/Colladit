export class DataStore {
  constructor(id, data) {
    this.id = id;
    this.data = data || [];
  }
}

export let sessions=[];
sessions.push(new DataStore("220982d5-b01a-40c8-9735-a752093963d6", ["a", "b", "c"]))