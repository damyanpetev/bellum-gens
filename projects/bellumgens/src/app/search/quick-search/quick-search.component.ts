import { Component } from '@angular/core';
import { SearchResult, ApiSearchService } from '../../../../../common/src/public_api';
import { IgxIconService, IgxListModule, IgxProgressBarModule, IgxAvatarModule, IgxIconModule, IgxButtonModule, IgxRippleModule } from '@infragistics/igniteui-angular';
import { ReduceQuickSearchResultPipe } from '../../pipes/reduce-quick-search-result.pipe';
import { CountrySVGPipe } from '../../../../../common/src/lib/pipes/country-svg.pipe';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-quick-search',
    templateUrl: './quick-search.component.html',
    styleUrls: ['./quick-search.component.scss'],
    standalone: true,
    imports: [IgxListModule, IgxProgressBarModule, NgIf, RouterLink, IgxAvatarModule, IgxIconModule, NgFor, IgxButtonModule, IgxRippleModule, DecimalPipe, CountrySVGPipe, ReduceQuickSearchResultPipe]
})
export class QuickSearchComponent {
  public searchResult: SearchResult = { steamUser: null, players: [], teams: [], strategies: [] };
  public loading = false;
  public term = '';

  constructor(private apiService: ApiSearchService, private iconService: IgxIconService) {
    this.apiService.searchResult.subscribe(data => {
      if (data) {
        this.searchResult = data;
      }
    });
    this.apiService.loadingQuickSearch.subscribe(data => this.loading = data);
    this.apiService.searchTerm.subscribe(term => this.term = term);
    this.iconService.addSvgIcon('headshot', '/assets/headshot24x24.svg', 'weapon-icons');
  }

}
