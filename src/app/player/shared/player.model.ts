export class Player {
  leagueId: any;
  leagueName: string;
  divisionId: any;
  divisionName: string;
  teamId: any;
  teamName: string;
  playerName: string;
  id?: number | string;

  constructor(
    leagueId: any,
    leagueName: string,
    divisionId: any,
    divisionName: string,
    teamId: any,
    teamName: string,
    playerName: string,
    id?: number | string
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
