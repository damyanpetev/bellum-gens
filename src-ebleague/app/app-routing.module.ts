import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentHomeComponent } from './home/home.component';
import { RaffleComponent } from './raffle/raffle.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { RegistrationSuccessComponent } from './tournament-registration/registration-success/registration-success.component';

export const routes: Routes = [
  { path: '', component: TournamentHomeComponent },
  { path: 'raffle', component: RaffleComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent },
  { path: 'format', redirectTo: '/tournament/format', pathMatch: 'full' },
  { path: 'csgo', redirectTo: '/tournament/csgo', pathMatch: 'full' },
  { path: 'sc2', redirectTo: '/tournament/sc2', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'tournament', loadChildren: () => import('./tournaments/tournament.module').then(m => m.TournamentModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: '**', component: TournamentHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
