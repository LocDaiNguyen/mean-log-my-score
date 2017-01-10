import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryData implements InMemoryDbService {

  createDb() {

    let leagues = [
      {
        id: 1,
        name: 'Adult Recreation League',
        abbreviation: 'ARL',
        creator: 'owner',
        _createdOn: 1476716400000,
        _updatedOn: 1476716400000
      }
    ];


    return {leagues};
  }
}
