export class Score {
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
  gameId: any;
  scoreType: string;
  goalScorerId: any;
  goalScorerName: string;
  assistorOneId: any;
  assistorOneName: string;
  assistorTwoId: any;
  assistorTwoName: string;
  situation: string;
  period: string;
  scoreTime: string;
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
    gameId: any,
    scoreType: string,
    goalScorerId: any,
    goalScorerName: string,
    assistorOneId: any,
    assistorOneName: string,
    assistorTwoId: any,
    assistorTwoName: string,
    situation: string,
    period: string,
    scoreTime: string,
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
    this.gameId = gameId,
    this.scoreType = scoreType,
    this.goalScorerId = goalScorerId,
    this.goalScorerName = goalScorerName,
    this.assistorOneId = assistorOneId,
    this.assistorOneName = assistorOneName,
    this.assistorTwoId = assistorTwoId,
    this.assistorTwoName = assistorTwoName,
    this.situation = situation,
    this.period = period,
    this.scoreTime = scoreTime,
    this.id = id;
  }
}