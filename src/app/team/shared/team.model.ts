export class Team {
  leagueId: any;
  leagueName: string;
  divisionId: any;
  divisionName: string;
  teamName: string;
  id?: any;

  constructor(
    leagueId: any,
    leagueName: string,
    divisionId: any,
    divisionName: string,
    teamName: string,
    id?: any
  ) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.divisionId = divisionId;
    this.divisionName = divisionName;
    this.teamName = teamName;
    this.id = id;
  }
}
