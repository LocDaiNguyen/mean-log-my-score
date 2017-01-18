export class Team {
  leagueId: any;
  leagueName: string;
  divisionId: any;
  divisionName: string;
  teamName: string;
  id?: number | string;

  constructor(
    leagueId: any,
    leagueName: string,
    divisionId: any,
    divisionName: string,
    teamName: string,
    id?: number | string
  ) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.divisionId = divisionId;
    this.divisionName = divisionName;
    this.teamName = teamName;
    this.id = id;
  }
}
