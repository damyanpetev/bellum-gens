import { Component } from '@angular/core';
import {
  EMPTY_NEW_GROUP,
  Tournament,
  TournamentGroup,
  TournamentParticipant,
  ApiTournamentsService,
  TournamentCSGOMatch, TournamentMatchMap,
  CSGOActiveDutyDescriptor, ACTIVE_DUTY
} from '../../../../../common/src/public_api';
import { environment } from '../../../../../common/src/environments/environment';
import { IDropDroppedEventArgs, IRowDataEventArgs, IgxGridComponent, IgxDialogComponent, IgxSelectModule, IgxInputGroupModule, IgxGridModule, IgxGridToolbarModule, IgxButtonModule, IgxIconModule, IgxGridColumnModule, IgxAvatarModule, IgxListModule, IgxCardModule, IgxProgressBarModule, IgxDragDropModule, IgxBadgeModule, IgxSuffixModule, IgxDialogModule, IgxDatePickerModule, IgxTimePickerModule, IgxPrefixModule, IgxCheckboxModule } from '@infragistics/igniteui-angular';
import { NotInGroupPipe } from '../../pipes/not-in-group.pipe';
import { CSGOMapnamePipe } from '../../../../../common/src/lib/pipes/csgomapname.pipe';
import { CSGOMapimagePipe } from '../../../../../common/src/lib/pipes/csgomapimage.pipe';
import { ConfirmComponent } from '../../../../../common/src/lib/confirm/confirm.component';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-csgo',
    templateUrl: './admin-csgo.component.html',
    styleUrls: ['./admin-csgo.component.scss'],
    standalone: true,
    imports: [IgxSelectModule, FormsModule, IgxInputGroupModule, NgFor, IgxGridModule, IgxGridToolbarModule, IgxButtonModule, IgxIconModule, IgxGridColumnModule, IgxAvatarModule, IgxListModule, NgIf, IgxCardModule, IgxProgressBarModule, IgxDragDropModule, IgxBadgeModule, IgxSuffixModule, IgxDialogModule, IgxDatePickerModule, IgxTimePickerModule, IgxPrefixModule, IgxCheckboxModule, ConfirmComponent, DatePipe, CSGOMapimagePipe, CSGOMapnamePipe, NotInGroupPipe]
})
export class AdminCsgoComponent {
  public registrations: TournamentParticipant [];
  public groups: TournamentGroup [];
  public matches: TournamentCSGOMatch [];
  public loading = false;
  public loadingMatches = false;
  public environment = environment;
  public newGroup = Object.assign({}, EMPTY_NEW_GROUP);
  public pipeTrigger = 0;
  public mapList: CSGOActiveDutyDescriptor [] = ACTIVE_DUTY;
  public matchInEdit: TournamentCSGOMatch = { startTime: new Date() };
  public tournaments: Tournament [] = [];
  public selectedTournament: Tournament;

  constructor(private apiService: ApiTournamentsService) {
    this.apiService.tournaments.subscribe(t => this.tournaments = t);
  }

  public selectTournament(tournament: Tournament) {
    this.apiService.getCsgoRegistrations(tournament.id).subscribe(data => {
      if (data) {
        this.registrations = data;
      }
    });
    this.apiService.loadingCSGORegistrations.subscribe(data => this.loading = data);
    this.apiService.getCsgoGroups(tournament.id).subscribe(data => this.groups = data);
    this.apiService.loadingCSGOMatches.subscribe(data => this.loadingMatches = data);
    this.apiService.getCsgoMatches(tournament.id).subscribe(data => {
      if (data) {
        this.matches = data;
      }
    });
  }

  public submitGroup(group: TournamentGroup) {
    group.inEdit = false;
    this.apiService.submitCSGOGroup(group).subscribe(data => {
      if (!this.groups.find(g => g.id === data.id)) {
        this.groups.push(data);
      }
    });
  }

  public deleteGroup(id: string) {
    const group = this.groups.find(g => g.id === id);
    this.apiService.deleteGroup(id).subscribe(() => this.groups.splice(this.groups.indexOf(group), 1));
    this.registrations.filter(r => r.tournamentCSGOGroupId === id).forEach(r => r.tournamentCSGOGroupId = null);
    this.pipeTrigger++;
  }

  public addToGroup(event: IDropDroppedEventArgs, group: TournamentGroup) {
    this.apiService.addParticipantToGroup(event.dragData, group.id).subscribe();
    if (!group.participants) {
      group.participants = [ event.dragData ];
    } else {
      group.participants.push(event.dragData);
    }
    event.dragData.TournamentCSGOGroupId = group.id;
    this.pipeTrigger++;
  }

  public removeFromGroup(participant: TournamentParticipant, group: TournamentGroup) {
    this.apiService.removeParticipantFromGroup(participant.id).subscribe();
    group.participants.splice(group.participants.indexOf(participant), 1);
    this.registrations.find(r => r.id === participant.id).tournamentCSGOGroupId = null;
    this.pipeTrigger++;
  }

  public submitMatch(grid: IgxGridComponent) {
    if (this.matchInEdit.team1Id && this.matchInEdit.team2Id) {
      this.apiService.submitCSGOMatch(this.matchInEdit).subscribe(data => {
        if (data) {
          if (!this.matchInEdit.id) {
            data.startTime = new Date(data.startTime);
            grid.addRow(data);
          }
        }
      });
    }
  }

  public deleteMatch(event: IRowDataEventArgs) {
    const match = event.data;
    this.apiService.deleteCSGOMatch(match).subscribe();
  }

  public addNewMatch() {
    this.matchInEdit = { startTime: new Date() };
  }

  public editMatch(match: TournamentCSGOMatch, dialog: IgxDialogComponent) {
    if (!(match.startTime instanceof Date)) {
      match.startTime = new Date(match.startTime);
    }
    this.matchInEdit = match;
    dialog.open();
  }

  public deleteMatchMap(map: TournamentMatchMap, maps: TournamentMatchMap []) {
    this.apiService.deleteCSGOMatchMap(map.id).subscribe(() => {
      maps.splice(maps.indexOf(map), 1);
    });
  }
}
