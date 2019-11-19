import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PositionSettings,
  HorizontalAlignment,
  OverlaySettings,
  IgxDropDownComponent,
  IgxInputGroupComponent,
  AutoPositionStrategy,
  IgxBannerComponent} from 'igniteui-angular';
import { LoginService } from '../../src-common/services/login.service';
import { ApplicationUser } from '../../src-common/models/applicationuser';
import { BellumgensApiService } from '../../src-common/services/bellumgens-api.service';
import { SearchResult } from '../../src-common/models/searchresult';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { UnreadNotificationsPipe } from '../../src-bellumgens/app/pipes/unread-notifications.pipe';
import { BaseComponent } from '../../src-bellumgens/app/base/base.component';
import { GlobalOverlaySettings } from '../../src-common/models/misc';
import { CommunicationService } from '../../src-common/services/communication.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  public authUser: ApplicationUser;
  public searchResult: SearchResult;
  public unreadNotifications = 0;

  public overlaySettings = GlobalOverlaySettings;

  @ViewChild('quickSearch', { static: true }) public quickSearchDropDown: IgxDropDownComponent;
  @ViewChild('myTeam', { static: true }) public teamDropDown: IgxDropDownComponent;
  @ViewChild('searchGroup', { static: true }) public searchGroup: IgxInputGroupComponent;
  @ViewChild('searchInput', { static: true }) public searchInput: ElementRef;
  @ViewChild('cookiesBanner', { static: true }) public banner: IgxBannerComponent;

  private unreadPipe = new UnreadNotificationsPipe();

  constructor(private authManager: LoginService,
              private apiService: BellumgensApiService,
              private commService: CommunicationService,
              title: Title,
              meta: Meta,
              activeRoute: ActivatedRoute) {
    super(title, meta, activeRoute);
    this.commService.openTeams.subscribe(_ => this.teamDropDown.open());
  }

  public ngOnInit(): void {
    this.subs.push(this.authManager.applicationUser.subscribe(data => {
      this.authUser = data;
      this.unreadNotifications += this.unreadPipe.transform(data.notifications);
    }));
    if (window && !window.localStorage.getItem('cookiesAccepted')) {
      this.banner.open();
    }
    this.initQuickSearch();
  }

  public acceptCookies() {
    this.banner.close();
    window.localStorage.setItem('cookiesAccepted', 'true');
  }

  private initQuickSearch() {
    const input = fromEvent(this.searchInput.nativeElement, 'keyup')
                    .pipe(map<Event, string>(e => (<HTMLInputElement>e.currentTarget).value));
    const debouncedInput = input.pipe(debounceTime(300));
    this.subs.push(debouncedInput.subscribe(val => {
      if (val.length) {
        const positionSettings: PositionSettings = {
          horizontalDirection: HorizontalAlignment.Left,
          horizontalStartPoint: HorizontalAlignment.Right,
          target: this.searchGroup.element.nativeElement
        };
        const overlaySettings: OverlaySettings = {
          positionStrategy: new AutoPositionStrategy(positionSettings),
          modal: false
        };
        this.quickSearchDropDown.open(overlaySettings);
        this.apiService.quickSearch(val);
      }
    }));
  }

  public notificationsLoaded(args: number) {
    this.unreadNotifications += args;
  }
}
