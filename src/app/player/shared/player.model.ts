export class Player {
  leagueId: any;
  leagueName: string;
  divisionId: any;
  divisionName: string;
  teamId: any;
  teamName: string;
  playerName: string;
  id?: any;

  constructor(
    leagueId: any,
    leagueName: string,
    divisionId: any,
    divisionName: string,
    teamId: any,
    teamName: string,
    playerName: string,
    id?: any
  ) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.divisionId = divisionId;
    this.divisionName = divisionName;
    this.teamId = teamId;
    this.teamName = teamName;
    this.playerName = playerName;
    this.id = id;
  }
}
