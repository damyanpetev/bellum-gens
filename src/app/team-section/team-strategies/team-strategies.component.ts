import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BellumgensApiService } from 'src/app/services/bellumgens-api.service';
import { TeamStrategy, Side, newEmptyStrategy } from 'src/app/models/csgoteamstrategy';
import { MapPool, CSGOMap, ActiveDutyDescriptor, ActiveDuty } from 'src/app/models/csgomaps';
import { SuccessErrorComponent } from 'src/app/success-error/success-error.component';
import { IgxDialogComponent } from 'igniteui-angular';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MapnamePipe } from 'src/app/pipes/mapname.pipe';

@Component({
  selector: 'app-team-strategies',
  templateUrl: './team-strategies.component.html',
  styleUrls: ['./team-strategies.component.css']
})
export class TeamStrategiesComponent implements OnInit {
  teamStrats: TeamStrategy [];
  maps: MapPool [];
  mapList: ActiveDutyDescriptor [] = ActiveDuty;
  teamId: string;
  newStrategy: TeamStrategy = newEmptyStrategy();
  sanitizedUrl: SafeResourceUrl;
  videoId: string;
  pipeTrigger = 0;
  changes = false;

  @Input()
  isAdmin = false;

  private _youtubeRegEx = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;

  @ViewChild(SuccessErrorComponent) public toast: SuccessErrorComponent;
  @ViewChild(IgxDialogComponent) public dialog: IgxDialogComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: BellumgensApiService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.teamId = params['teamid'];

      if (this.teamId) {
        this.apiService.getTeamStrats(this.teamId).subscribe(strats => this.teamStrats = strats);
        this.apiService.getTeamMapPool(this.teamId).subscribe(maps => this.maps = maps);
      }
    });
  }

  public get selectedMaps() {
    let names = '';
    if (this.maps) {
      const pipe = new MapnamePipe();
      this.maps.forEach((map) => {
        if (map.IsPlayed) {
          if (names.length) {
            names += ', ' + pipe.transform(map.Map);
          } else {
            names += pipe.transform(map.Map);
          }
        }
      });
    }
    return names;
  }

  public changeMaps(args: MapPool) {
    this.maps.find(m => m.Map === args.Map).IsPlayed = args.IsPlayed;
    this.changes = true;
    this.pipeTrigger++;
  }

  public saveMaps() {
    this.apiService.setTeamMapPool(this.maps).subscribe(
      success => {
        this.changes = false;
        this.toast.showSuccess('Map pool updated successfully!');
      },
      error => this.toast.showError(error.error.Message)
    );
  }

  public openNewStrategy(event: Event) {
    event.preventDefault();
    this.dialog.open();
  }

  public selectMap(args) {
    this.newStrategy.Map = args.newSelection.value;
  }

  public editStrategy(strat: TeamStrategy) {
    this.newStrategy = strat;
    this.dialog.open();
  }

  public submitStrategy() {
    this.newStrategy.TeamId = this.teamId;
    this.apiService.submitStrategy(this.newStrategy).subscribe(
      success => {
        if (!this.newStrategy.Id) {
          this.teamStrats.push(this.newStrategy);
          this.pipeTrigger++;
        }
        this.newStrategy = newEmptyStrategy();
        this.dialog.close();
        this.toast.showSuccess('Update submitted successfully!');
      },
      error => this.toast.showError(error.error.Message)
    );
  }

  public getVideoEmbedLink() {
    if (this._youtubeRegEx.test(this.newStrategy.Url)) {
      const parts = this._youtubeRegEx.exec(this.newStrategy.Url);
      if (this.videoId && this.videoId === parts[5]) {
        return true;
      }
      this.videoId = parts[5];
      this.newStrategy.Url = this.getYoutubeEmbedLink(this.newStrategy.Url);
      return true;
    }
    return false;
  }

  public getYoutubeEmbedLink(url: string): string {
    const parts = this._youtubeRegEx.exec(url);
    return `https://www.youtube.com/embed/${parts[5]}`;
  }

}