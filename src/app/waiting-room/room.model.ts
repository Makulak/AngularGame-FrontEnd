import { Player } from './player.model';
import { Convertable } from '../shared/convertable.interface';

export class Room implements Convertable<any> {

  id: number;
  name: string;
  status: string;
  players: Player[];
  maxPlayersCount: number;
  hasPassword: boolean;

  convertFrom(obj: any): this {
    this.id = obj.id;
    this.name = obj.name;
    this.status = obj.status;
    this.players = obj.players.map(player => new Player().convertFrom(player));
    this.maxPlayersCount = obj.maxPlayersCount;
    this.hasPassword = obj.hasPassword;

    return this;
  }

  public get playersCount() {
    if (!!this.players) {
      return this.players.length;
    } else {
      return 0;
    }
  }

  public get playerNames() {
    if (!!this.players) {
      return this.players.map(player => player.userName).join(', ');
    } else {
      return null;
    }
  }
}
