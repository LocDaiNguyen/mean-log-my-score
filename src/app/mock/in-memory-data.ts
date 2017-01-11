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


    return {leagues, divisions, teams};
  }
}
