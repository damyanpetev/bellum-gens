import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { getEmptyNewApplication, Game, GAMES } from '../../../src-common/models/tournament';
import { ApplicationUser } from '../../../src-common/models/applicationuser';
import { LoginService } from '../../../src-common/services/login.service';
import { ApiTournamentsService } from '../../../src-common/services/bellumgens-api.tournaments.service';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent {
  public application = getEmptyNewApplication();
  public authUser: ApplicationUser;
  public companies: string [];
  public games = GAMES;
  public gameEnum = Game;
  public bankaccountinfo = {
    bank: 'ОББ',
    name: 'Белум Генс',
    bic: 'UBBSBGSF',
    account: 'BG90UBBS80021087375040'
  };
  public inProgress = false;

  @Input()
  public tournamentId: string;

  @ViewChild('appDetails', { static: true })
  public appDetails: ElementRef;

  constructor(private authManager: LoginService,
              private apiService: ApiTournamentsService) {
    this.authManager.applicationUser.subscribe(user => this.authUser = user);
    this.apiService.companies.subscribe(data => this.companies = data);
  }

  public leagueRegistration() {
    this.inProgress = true;
    this.application.TournamentId = this.tournamentId;
    this.apiService.leagueRegistration(this.application).subscribe(application => {
      this.inProgress = false;
      this.application = application;
      this.apiService.updateRegistrations();
      // this.successDialog.open();
    },
    _ => this.inProgress = false);
  }

  public selectGame(game: Game) {
    if (this.authUser) {
      this.application.Game = game;
      const element = document.getElementById('registration');
      element.scrollIntoView({ behavior: 'smooth' });
      this.showDetails();
    }
  }

  public showDetails() {
    if (this.application.Game !== null) {
      this.appDetails.nativeElement.classList.add('application-details-show');
    }
  }

  public scrollToTerms(event: MouseEvent) {
    const element = document.getElementById('terms');
    element.scrollIntoView({ behavior: 'smooth' });
    event.stopPropagation();
  }
}
