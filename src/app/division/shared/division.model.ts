export class Division {
  leagueId: any;
  leagueName: string;
  divisionName: string;
  id?: any;

  constructor(leagueId: any, leagueName: string, divisionName: string, id?: any) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.divisionName = divisionName;
    this.id = id;
  }
}
