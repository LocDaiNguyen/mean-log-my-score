import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Season } from '../shared/season.model';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';
import { Player } from '../../player/shared/player.model';
import { PlayerService } from '../../player/shared/player.service';

@Component({
  selector: 'lms-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonDetailComponent implements OnInit {

  originalName: string;
  selectedSeason: Season;
  selectedLeague: League;
  leagues$: Observable<League[]> = this.leagueService.leagues$;
  league = { leagueId: null };
  selectedDivision: Division;
  divisions$: Observable<Division[]> = this.divisionService.divisions$;
  division = { divisionId: null };
  selectedTeam: Team;
  teams$: Observable<Team[]> = this.teamService.teams$;
  team = { teamId: null };
  selectedPlayer: Player;
  players$: Observable<Player[]> = this.playerService.players$;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set season(value: Season) {
    if (value) { this.originalName = value.seasonName; }
    this.selectedSeason = Object.assign({}, value);
  }

  constructor(
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {;
    this.leagueService.getAllLeagues();
    this.divisionService.getAllDivisions();
    this.teamService.getAllTeams();
    this.playerService.getAllPlayers();
  }

  save(form: NgForm) {
    if (this.selectedSeason.id) {
      return this.saved.emit(this.selectedSeason);
    }
    let newSeason: Season = {
      seasonName: form.value.seasonName,
      leagueId: form.value.league.id,
      leagueName: form.value.league.leagueName,
      divisionId: form.value.division.id,
      divisionName: form.value.division.divisionName,
      teamId: form.value.team.id,
      teamName: form.value.team.teamName,
      playerId: form.value.player.id,
      playerName: form.value.player.playerName
    };
    this.saved.emit(newSeason);
    this.resetValues();
  }

  cancel(season: Season) {
    this.resetValues();
    this.cancelled.emit(season);
  }

  resetValues() {
    this.selectedLeague = {
      id: null,
      leagueName: ''};
    this.selectedDivision = {
      id: null,
      divisionName: '',
      leagueId: null,
      leagueName: ''
    };
    this.selectedTeam = {
      id: null,
      teamName: '',
      divisionId: null,
      divisionName: '',
      leagueId: null,
      leagueName: ''
    };
    this.selectedPlayer = {
      id: null,
      playerName: '',
      divisionId: null,
      divisionName: '',
      leagueId: null,
      leagueName: '',
      teamId: null,
      teamName: ''
    };
  }

  onChangeLeague(league): void {
    this.league = { leagueId: league.id };
  }

  onChangeDivision(division): void {
    this.division = { divisionId: division.id };
  }

  onChangeTeam(team): void {
    this.team = { teamId: team.id };
  }

}
