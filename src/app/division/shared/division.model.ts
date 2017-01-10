export class Division {
  leagueId: any;
  divisionName: string;
  id?: any;

  constructor(leagueId: any, divisionName: string, id?: any) {
    this.leagueId = leagueId;
    this.divisionName = divisionName;
    this.id = id;
  }
}