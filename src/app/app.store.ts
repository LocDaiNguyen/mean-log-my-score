import { League } from './league/shared/league.model';
import { Division } from './division/shared/division.model';
import { Team } from './team/shared/team.model';

export interface AppStore {
  leagues: League[];
  divisions: Division[];
  teams: Team[];
}
