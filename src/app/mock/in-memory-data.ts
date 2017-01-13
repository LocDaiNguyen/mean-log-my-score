import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryData implements InMemoryDbService {

  createDb() {

    let leagues = [
      {
        id: 1,
        leagueName: 'Adult Recreation League',
      },
      {
        id: 2,
        leagueName: 'Random Beer League',
      }
    ];




    let divisions = [
      {
        id: 1,
        divisionName: 'A',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
      },
      {
        id: 2,
        divisionName: 'B',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
      },
      {
        id: 3,
        divisionName: 'C',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
      },
      {
        id: 4,
        divisionName: 'D',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
      },
      {
        id: 5,
        divisionName: 'E',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
      },
      {
        id: 6,
        divisionName: 'TwoFour',
        leagueId: 2,
        leagueName: 'Random Beer League',
      },
    ];




    let teams = [
      {
        id: 1,
        teamName: 'Falcons',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
      },
      {
        id: 2,
        teamName: 'Rebels',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
      },
      {
        id: 3,
        teamName: 'Stingers',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
      },
      {
        id: 4,
        teamName: 'Boomers',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
      },
      {
        id: 5,
        teamName: 'Knights',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
      },
      {
        id: 6,
        teamName: 'Warriors',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
      }
    ];




    let players = [
      {
        id: 1,
        playerName: 'Loc Nguyen',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 1,
        teamName: 'Falcons',
      },
      {
        id: 2,
        playerName: 'Tony Vo',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 1,
        teamName: 'Falcons',
      },
      {
        id: 3,
        playerName: 'Trung Nguyen',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 1,
        teamName: 'Falcons',
      },
      {
        id: 4,
        playerName: 'John Wick',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 2,
        teamName: 'Rebels',
      }
    ];




    let seasons = [
      {
        id: 1,
        seasonName: 'ARL A Winter 2017',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 1,
        teamName: 'Falcons',
        playerId: 1,
        playerName: 'Loc Nguyen',
      }
    ];




    let games = [
      {
        id: 1,
        opponentId: 2,
        opponentName: 'Rebels',
        date: 'Fri Jan 20 2017 20:00:00 GMT-0500 (EST)',
        time: 'Fri Jan 20 2017 20:00:00 GMT-0500 (EST)',
        gameType: 'Regular',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 1,
        teamName: 'Falcons',
        seasonId: 1,
        seasonName: 'ARL A Winter 2017',
        playerId: 1,
        playerName: 'Loc Nguyen',
      }
    ];




    let scores = [
      {
        id: 1,
        scoreType: 'Goal',
        goalScorerId: 1,
        goalScorerName: 'Loc Nguyen',
        assistorOneId: 2,
        assistorOneName: 'Tony Vo',
        assistorTwoId: 3,
        assistorTwoName: 'Trung Nguyen',
        situation: 'Even Strength',
        period: '1st',
        scoreTime: '10:33',
        leagueId: 1,
        leagueName: 'Adult Recreation League',
        divisionId: 1,
        divisionName: 'A',
        teamId: 1,
        teamName: 'Falcons',
        seasonId: 1,
        seasonName: 'ARL A Winter 2017',
        playerId: 1,
        playerName: 'Loc Nguyen',
        gameId: 1,
        opponentId: 2,
        opponentName: 'Rebels',
        date: 'Fri Jan 20 2017 20:00:00 GMT-0500 (EST)',
        time: 'Fri Jan 20 2017 20:00:00 GMT-0500 (EST)',
        gameType: 'Regular',
      }
    ];


    return {leagues, divisions, teams, players, seasons, games, scores};
  }
}
