import { Component, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';

import { IgxBannerComponent, IgxNavigationDrawerComponent} from 'igniteui-angular';
import { LoginService } from '../../src-common/services/login.service';
import { ApplicationUser } from '../../src-common/models/applicationuser';
import { environment } from '../../src-common/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public authUser: ApplicationUser;
  public environment = environment;
  private isBrowser: boolean;

  @ViewChild('cookiesBanner', { static: true }) public banner: IgxBannerComponent;
  @ViewChild('drawer', { static: true }) public navdrawer: IgxNavigationDrawerComponent;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private authManager: LoginService, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.authManager.applicationUser.subscribe(data => {
      this.authUser = data;
    });
  }

  public ngOnInit(): void {
    if (this.isBrowser && !window.localStorage.getItem('cookiesAccepted')) {
      this.banner.open();
    }

    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd)
    )
    .subscribe(_ => this.navdrawer.close());
  }

  public acceptCookies() {
    this.banner.close();
    window.localStorage.setItem('cookiesAccepted', 'true');
  }
}
