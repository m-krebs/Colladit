export class DataStore {
  constructor(id, data) {
    this.id = id;
    this.data = data || [];
  }
}

export let sessions=[];
