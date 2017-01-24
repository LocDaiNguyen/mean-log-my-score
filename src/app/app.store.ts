import { League } from './league/shared/league.model';
import { Division } from './division/shared/division.model';

export interface AppStore {
  leagues: League[];
  divisions: Division[];
}
