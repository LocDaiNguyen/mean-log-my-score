export class League {
  leagueName: string;
  id?: number | string;

  constructor(leagueName: string) {
    this.leagueName = leagueName;
  }
}
