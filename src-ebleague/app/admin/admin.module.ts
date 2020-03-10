import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IgxChipsModule,
  IgxInputGroupModule,
  IgxListModule,
  IgxIconModule,
  IgxAvatarModule,
  IgxDatePickerModule,
  IgxButtonModule,
  IgxCardModule,
  IgxProgressBarModule,
  IgxBadgeModule,
  IgxDragDropModule,
  IgxTabsModule,
  IgxSelectModule,
  IgxTimePickerModule,
  IgxCalendarModule} from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { AdminCsgoComponent } from './admin-csgo/admin-csgo.component';
import { BellumGensModule } from '../../../src-common/components/components.module';
import { AdminSc2Component } from './admin-sc2/admin-sc2.component';
import { NotInGroupPipe } from '../pipes/not-in-group.pipe';
import { GetPlayersPipe } from '../pipes/get-players.pipe';


@NgModule({
  declarations: [
    AdminComponent,
    AdminCsgoComponent,
    AdminSc2Component,
    NotInGroupPipe,
    GetPlayersPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    IgxChipsModule,
    IgxInputGroupModule,
    IgxListModule,
    IgxIconModule,
    IgxAvatarModule,
    IgxDatePickerModule,
    IgxButtonModule,
    IgxCardModule,
    IgxProgressBarModule,
    IgxBadgeModule,
    BellumGensModule,
    IgxDragDropModule,
    IgxSelectModule,
    IgxTabsModule,
    IgxTimePickerModule,
    IgxCalendarModule
  ]
})
export class AdminModule { }
