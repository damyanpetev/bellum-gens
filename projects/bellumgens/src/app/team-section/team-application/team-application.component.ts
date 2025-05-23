import { Component, ViewChild, Input } from '@angular/core';
import { IgxDialogComponent, IgxButtonModule, IgxRippleModule, IgxDialogModule, IgxInputGroupModule, IgxIconModule } from '@infragistics/igniteui-angular';
import {
  ApplicationUser,
  TeamApplication, CSGOTeam,
  NotificationState,
  BellumgensApiService
} from '../../../../../common/src/public_api';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-team-application',
    templateUrl: './team-application.component.html',
    styleUrls: ['./team-application.component.css'],
    standalone: true,
    imports: [IgxButtonModule, IgxRippleModule, IgxDialogModule, IgxInputGroupModule, FormsModule, NgIf, IgxIconModule]
})
export class TeamApplicationComponent {
  @ViewChild(IgxDialogComponent, { static: true }) public dialog: IgxDialogComponent;

  @Input()
  public authUser: ApplicationUser;

  @Input()
  public team: CSGOTeam;

  public application: TeamApplication = {
    teamId: '',
    applicantId: '',
    state: NotificationState.NotSeen,
    message: ''
  };

  constructor(private apiService: BellumgensApiService) { }

  public submitApplication() {
    if (this.authUser) {
      this.application.applicantId = this.authUser.id;
      this.application.teamId = this.team.teamId;
      this.apiService.submitApplication(this.application).subscribe(() => this.dialog.close());
    }
  }
}
