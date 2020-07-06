import { Convertable } from '../shared/convertable.interface';

export class Room implements Convertable<any> {

  id: string;
  name: string;
  status: string;
  playersCount: number;
  maxPlayersCount: number;
  hasPassword: boolean;

  convertFrom(obj: any): this {
    this.id = obj.id;
    this.name = obj.name;
    this.status = obj.status;
    this.playersCount = obj.playersCount;
    this.maxPlayersCount = obj.maxPlayersCount;
    this.hasPassword = obj.hasPassword;

    return this;
  }
}
