import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgxNavbarModule,
  IgxLayoutModule,
  IgxRippleModule,
  IgxAvatarModule,
  IgxListModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxDialogModule,
  IgxButtonModule,
  IgxProgressBarModule,
  IgxBadgeModule,
  IgxCardModule,
  IgxDropDownModule,
  IgxCheckboxModule,
  IgxToggleModule,
  IgxTabsModule,
  IgxSnackbarModule,
  IgxBannerModule,
  IgxIconService,
  IgxSwitchModule,
  IgxSelectModule,
  IgxDividerModule,
  IgxAutocompleteModule} from 'igniteui-angular';
import { LoginService } from '../../src-common/services/login.service';
import { BellumgensApiService } from '../../src-common/services/bellumgens-api.service';
import { SuccessErrorComponent } from '../../src-bellumgens/app/success-error/success-error.component';
import { ConfirmComponent } from '../../src-bellumgens/app/confirm/confirm.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../src-common/environments/environment';
import { TournamentHomeComponent } from './home/tournament-home.component';
import { ApiTournamentsService } from '../../src-common/services/bellumgens-api.tournaments.service';
import { TeamNewComponent } from '../../src-bellumgens/app/team-section/team-new/team-new.component';
import { TournamentFormatComponent } from './tournaments/tournament-format/tournament-format.component';
import { LoginDialogComponent } from '../../src-bellumgens/app/login/login-dialog/login-dialog.component';
import { LoginComponent } from '../../src-bellumgens/app/login/login.component';
import { QuickSearchComponent } from '../../src-bellumgens/app/search/quick-search/quick-search.component';
import { GetRegCountPipe } from '../../src-bellumgens/app/pipes/get-reg-count.pipe';
import { StartsWithPipe } from '../../src-bellumgens/app/pipes/starts-with.pipe';
import { GroupsFilterPipe } from '../../src-bellumgens/app/pipes/groups-filter.pipe';
import { UserPreferencesComponent } from '../../src-bellumgens/app/player-section/user-preferences/user-preferences.component';
import { ReduceQuickSearchResultPipe } from '../../src-bellumgens/app/pipes/reduce-quick-search-result.pipe';
import { PlayerCountryPipe } from '../../src-bellumgens/app/pipes/player-country.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SuccessErrorComponent,
    ConfirmComponent,
    TournamentHomeComponent,
    TeamNewComponent,
    TournamentFormatComponent,
    LoginComponent,
    LoginDialogComponent,
    QuickSearchComponent,
    UserPreferencesComponent,
    GetRegCountPipe,
    StartsWithPipe,
    GroupsFilterPipe,
    ReduceQuickSearchResultPipe,
    PlayerCountryPipe
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    IgxAvatarModule,
    IgxNavbarModule,
    IgxLayoutModule,
    IgxRippleModule,
    IgxListModule,
    IgxIconModule,
    IgxDialogModule,
    IgxInputGroupModule,
    IgxTabsModule,
    IgxButtonModule,
    IgxToggleModule,
    IgxBadgeModule,
    IgxCardModule,
    IgxDropDownModule,
    IgxCheckboxModule,
    IgxSnackbarModule,
    IgxBannerModule,
    IgxProgressBarModule,
    IgxSwitchModule,
    IgxSelectModule,
    IgxDividerModule,
    IgxAutocompleteModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LoginService,
    BellumgensApiService,
    ApiTournamentsService,
    IgxIconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private iconService: IgxIconService) {
    this.iconService.addSvgIcon('Steam', '/assets/login/steam-logo-white.svg', 'login-icons');
    this.iconService.addSvgIcon('Facebook', '/assets/login/fb.svg', 'login-icons');
    this.iconService.addSvgIcon('Twitter', '/assets/login/twitter.svg', 'login-icons');
    this.iconService.addSvgIcon('BattleNet', '/assets/login/battle-net.svg', 'login-icons');
  }
}
