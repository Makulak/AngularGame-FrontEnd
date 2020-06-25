import { Convertable } from '../shared/convertable.interface';

export class Player implements Convertable<any> {
  userName: string;
  role: string;

  convertFrom(obj: any): this {
    this.userName = obj.userName;
    this.role  = obj.role;

    return this;
  }
}
