import { League } from './league/shared/league.model';
import { Division } from './division/shared/division.model';
import { Team } from './team/shared/team.model';
import { Player } from './player/shared/player.model';
import { Season } from './season/shared/season.model';

export interface AppStore {
  leagues: League[];
  divisions: Division[];
  teams: Team[];
  players: Player[];
  seasons: Season[];
}
