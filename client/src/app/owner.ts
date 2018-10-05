export class Owner {
  id: string;
  owner: string;
  status: string;

  constructor(id: string, owner: string, status:string) {
    this.id = id;
    this.owner = owner;
    this.status = status;
  }
};