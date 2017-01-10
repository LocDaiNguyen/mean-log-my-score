import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryData implements InMemoryDbService {

  createDb() {

    let leagues = [
      {
        id: 1,
        leagueName: 'Adult Recreation League',
      }
    ];


    return {leagues};
  }
}
