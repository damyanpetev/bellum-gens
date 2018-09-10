import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BellumgensApiService } from '../services/bellumgens-api.service';
import { CSGOTeam } from '../models/csgoteam';
import { SteamUser, SteamGroup } from '../models/steamuser';
import { LoginService } from '../services/login.service';
import { noop } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamComponent {
  public team: CSGOTeam;
  public authUser: SteamUser;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: BellumgensApiService,
              private authManager: LoginService) {
    this.authManager.steamUser.subscribe((data: SteamUser) => {
      this.authUser = data;
    });
    this.activatedRoute.params.subscribe(params => {
      const teamId = params['teamId'];

      if (teamId) {
        this.apiService.getTeam(teamId).subscribe(team => this.team = team);
      }
    });
  }

  public getPrimaryGroups(): SteamGroup[] {
    return this.authUser.groups.filter(g => g.isPrimary);
  }

  public createFromSteam(group: SteamGroup): void {
    this.apiService.registerSteamGroup(group).subscribe(
      data => console.log('success')
    );
  }
}