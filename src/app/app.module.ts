import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryData } from './mock/in-memory-data';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { LeagueModule } from './league/league.module';
import { DivisionModule } from './division/division.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { SeasonModule } from './season/season.module';
import { GameModule } from './game/game.module';
import { ScoreModule } from './score/score.module';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryData),
    AppRoutingModule,
    AuthModule,
    LeagueModule,
    DivisionModule,
    TeamModule,
    PlayerModule,
    SeasonModule,
    GameModule,
    ScoreModule,
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
