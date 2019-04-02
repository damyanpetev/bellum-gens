import { Component, ViewChild, Input } from '@angular/core';
import { IgxDialogComponent,
  PositionSettings,
  HorizontalAlignment,
  OverlaySettings,
  ConnectedPositioningStrategy,
  IgxProgressType } from 'igniteui-angular';
import { LoginService } from '../services/login.service';
import { ApplicationUser } from '../models/applicationuser';
import { PlaystyleRole } from '../models/playerrole';

export interface ProfileCompleteness {
  availability: boolean;
  primaryRole: boolean;
  secondaryRole: boolean;
  mapPool: boolean;
  profileStage: number;
  doneColor: string;
  pendingColor: string;
  doneIcon: string;
  pendingIcon: string;
  progressType: IgxProgressType;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _authUser: ApplicationUser;

  @Input()
  public set authUser(user: ApplicationUser) {
    this._authUser = user;
    if (user) {
      this.fillCompleteness();
    }
  }

  public get authUser(): ApplicationUser {
    return this._authUser;
  }

  public profileCompleteness: ProfileCompleteness = {
    availability: false,
    primaryRole: false,
    secondaryRole: false,
    mapPool: false,
    profileStage: 0,
    doneColor: '#4eb862',
    pendingColor: '#fbb13c',
    doneIcon: 'done',
    pendingIcon: 'priority_high',
    progressType: IgxProgressType.INFO
  };

  public positionSettings: PositionSettings = {
    horizontalDirection: HorizontalAlignment.Left,
    horizontalStartPoint: HorizontalAlignment.Right
  };

  public overlaySettings: OverlaySettings = {
    positionStrategy: new ConnectedPositioningStrategy(this.positionSettings)
  };

  @ViewChild(IgxDialogComponent) public dialog: IgxDialogComponent;

  constructor(private authManager: LoginService) { }

  public openLogin() {
    this.dialog.open();
  }

  public login(provider: string) {
    this.authManager.login(provider);
  }

  public logout() {
    this.authManager.logout();
  }

  private fillCompleteness() {
    if (this._authUser.Availability.filter(a => a.Available).length) {
      this.profileCompleteness.availability = true;
      this.profileCompleteness.profileStage++;
    }
    if (this._authUser.PreferredPrimaryRole !== PlaystyleRole.NotSet) {
      this.profileCompleteness.primaryRole = true;
      this.profileCompleteness.profileStage++;
    }
    if (this._authUser.PreferredSecondaryRole !== PlaystyleRole.NotSet) {
      this.profileCompleteness.secondaryRole = true;
      this.profileCompleteness.profileStage++;
    }
    if (this._authUser.MapPool.filter(m => m.IsPlayed).length) {
      this.profileCompleteness.mapPool = true;
      this.profileCompleteness.profileStage++;
    }
    this.profileCompleteness.progressType = this.profileCompleteness.profileStage <= 1 ? IgxProgressType.DANGER :
                                            this.profileCompleteness.profileStage >= 4 ? IgxProgressType.SUCCESS :
                                            IgxProgressType.WARNING;
  }
}
