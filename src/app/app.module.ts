import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryData } from './mock/in-memory-data';
import { StoreModule } from '@ngrx/store';

import { leagues } from './league/shared/league.reducer';
import { divisions } from './division/shared/division.reducer';
import { teams } from './team/shared/team.reducer';
import { players } from './player/shared/player.reducer';
import { seasons } from './season/shared/season.reducer';
import { games } from './game/shared/game.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './auth/login/login.component';
import { LoginRoutingModule } from './auth/login/login-routing.module';
import { SignupComponent } from './auth/signup/signup.component';

import { LeagueService } from './league/shared/league.service';
import { DivisionService } from './division/shared/division.service';
import { TeamService } from './team/shared/team.service';
import { PlayerService } from './player/shared/player.service';
import { SeasonService } from './season/shared/season.service';
import { GameService } from './game/shared/game.service';
import { ScoreService } from './score/shared/score.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LoginRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryData),
    StoreModule.provideStore({ leagues, divisions, teams, players, seasons, games }),
  ],
  providers: [
    LeagueService,
    DivisionService,
    TeamService,
    PlayerService,
    SeasonService,
    GameService,
    ScoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
