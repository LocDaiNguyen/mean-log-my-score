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
  situation: string;
  period: string;
  scoreTime: string;
  goalScorerId?: any;
  goalScorerName?: string;
  assistorOneId?: any;
  assistorOneName?: string;
  assistorTwoId?: any;
  assistorTwoName?: string;
  id?: number | string;

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
    situation: string,
    period: string,
    scoreTime: string,
    goalScorerId?: any,
    goalScorerName?: string,
    assistorOneId?: any,
    assistorOneName?: string,
    assistorTwoId?: any,
    assistorTwoName?: string,
    id?: number | string
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
    this.gameId = gameId;
    this.scoreType = scoreType;
    this.situation = situation;
    this.period = period;
    this.scoreTime = scoreTime;
    this.goalScorerId = goalScorerId;
    this.goalScorerName = goalScorerName;
    this.assistorOneId = assistorOneId;
    this.assistorOneName = assistorOneName;
    this.assistorTwoId = assistorTwoId;
    this.assistorTwoName = assistorTwoName;
    this.id = id;
  }
}
