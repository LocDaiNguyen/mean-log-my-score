export class Season {
  leagueId: any;
  leagueName: string;
  divisionId: any;
  divisionName: string;
  teamId: any;
  teamName: string;
  playerId: any;
  playerName: string;
  seasonName: string;
  id?: any;

  constructor(
    leagueId: any,
    leagueName: string,
    divisionId: any,
    divisionName: string,
    teamId: any,
    teamName: string,
    playerId: any,
    playerName: string,
    seasonName: string,
    id?: any
  ) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.divisionId = divisionId;
    this.divisionName = divisionName;
    this.teamId = teamId;
    this.teamName = teamName;
    this.playerId = playerId;
    this.playerName = playerName;
    this.seasonName = seasonName;
    this.id = id;
  }
}
