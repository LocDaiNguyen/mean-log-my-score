import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Player } from '../shared/player.model';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailComponent implements OnInit {

  originalName: string;
  selectedPlayer: Player;
  selectedLeague: League;
  leagues$: Observable<League[]> = this.leagueService.leagues$;
  league = { leagueId: null };
  selectedDivision: Division;
  divisions$: Observable<Division[]> = this.divisionService.divisions$;
  division = { divisionId: null };
  selectedTeam: Team;
  teams$: Observable<Team[]> = this.teamService.teams$;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set player(value: Player) {
    if (value) { this.originalName = value.playerName; }
    this.selectedPlayer = Object.assign({}, value);
  }

  constructor(
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService
  ) { }

  ngOnInit() {;
    this.leagueService.getAllLeagues();
    this.divisionService.getAllDivisions();
    this.teamService.getAllTeams();
  }

  save(form: NgForm) {
    if (this.selectedPlayer.id) {
      return this.saved.emit(this.selectedPlayer);
    }
    let newPlayer: Player = {
      playerName: form.value.playerName,
      leagueId: form.value.league.id,
      leagueName: form.value.league.leagueName,
      divisionId: form.value.division.id,
      divisionName: form.value.division.divisionName,
      teamId: form.value.team.id,
      teamName: form.value.team.teamName
    };
    this.saved.emit(newPlayer);
    this.resetValues();
  }

  cancel(player: Player) {
    this.resetValues();
    this.cancelled.emit(player);
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
  }

  onChangeLeague(league): void {
    this.league = { leagueId: league.id };
  }

  onChangeDivision(division): void {
    this.division = { divisionId: division.id };
  }

}
