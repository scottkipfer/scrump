export class Sprint {
  owner?: string;
  status?: string;

  constructor(owner: string, status:string) {
    this.owner = owner;
    this.status = status;
  }
}
