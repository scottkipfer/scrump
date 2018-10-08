export class Owner {
  _id: string;
  owner: string;
  status: string;

  constructor(id: string, owner: string, status:string) {
    this._id = id;
    this.owner = owner;
    this.status = status;
  }
};