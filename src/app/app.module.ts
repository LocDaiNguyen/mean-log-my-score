import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryData } from './mock/in-memory-data';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './auth/login/login.component';
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
    InMemoryWebApiModule.forRoot(InMemoryData),
    AppRoutingModule,
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
