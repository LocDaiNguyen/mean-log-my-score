export class Game {
  leagueId: any;
  leagueName: string;
  divisionId: any;
  divisionName: string;
  teamId: any;
  teamName: string;
  playerId: any;
  playerName: string;
  seasonId: any;
  seasonName: string;
  opponentId: any;
  opponentName: string;
  date: string;
  time: string;
  gameType: string;
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
    seasonId: any,
    seasonName: string,
    opponentId: any,
    opponentName: string,
    date: string,
    time: string,
    gameType: string,
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
    this.seasonId = seasonId;
    this.seasonName = seasonName;
    this.opponentId = opponentId;
    this.opponentName = opponentName;
    this.date = date;
    this.time = time;
    this.gameType = gameType;
    this.id = id;
  }
}
