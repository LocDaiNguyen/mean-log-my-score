export class League {
  leagueName: string;
  id?: number | string;

  constructor(leagueName: string, id?: number | string) {
    this.leagueName = leagueName;
    this.id = id;
  }
}
