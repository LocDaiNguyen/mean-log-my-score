export class Division {
  leagueId: any;
  leagueName: string;
  divisionName: string;
  id?: number | string;

  constructor(leagueId: any, leagueName: string, divisionName: string, id?: number | string) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.divisionName = divisionName;
    this.id = id;
  }
}
