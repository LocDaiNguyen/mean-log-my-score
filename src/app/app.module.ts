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

import { LeagueService } from './league/shared/league.service';
import { DivisionService } from './division/shared/division.service';
import { TeamService } from './team/shared/team.service';

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
  ],
  providers: [
    LeagueService,
    DivisionService,
    TeamService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
