import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { TournamentFormatComponent } from './tournament-format/tournament-format.component';
import { TournamentCsgoComponent } from './tournament-csgo/tournament-csgo.component';
import { TournamentSc2Component } from './tournament-sc2/tournament-sc2.component';
import { BaseComponent } from '../../../../bellumgens/src/app/base/base.component';
import { ProductionCrewComponent } from './production-crew/production-crew.component';
import { SortByPointsPipe } from '../pipes/sort-by-points.pipe';

import {
  IgxDividerModule,
  IgxButtonModule,
  IgxCardModule,
  IgxInputGroupModule,
  IgxAvatarModule,
  IgxIconModule,
  IgxProgressBarModule,
  IgxBadgeModule,
  IgxCalendarModule,
  IgxGridModule
} from '@infragistics/igniteui-angular';
import { TournamentsMainComponent } from './tournaments-main/tournaments-main.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TournamentRoutingModule,
        IgxDividerModule,
        IgxButtonModule,
        IgxCardModule,
        IgxInputGroupModule,
        IgxAvatarModule,
        IgxIconModule,
        IgxProgressBarModule,
        IgxBadgeModule,
        IgxCalendarModule,
        IgxGridModule,
        TournamentComponent,
        TournamentFormatComponent,
        TournamentCsgoComponent,
        TournamentSc2Component,
        ProductionCrewComponent,
        BaseComponent,
        SortByPointsPipe,
        TournamentsMainComponent
    ]
})
export class TournamentModule { }
