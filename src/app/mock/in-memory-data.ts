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
    ]


    return {leagues, divisions};
  }
}
