import { Component, Inject, LOCALE_ID } from '@angular/core';
import { GLOBAL_OVERLAY_SETTINGS } from '../../models/misc';

@Component({
  selector: 'bg-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {
  public overlaySettings = GLOBAL_OVERLAY_SETTINGS;
  public languageList = [
    { code: 'en', label: 'English' },
    { code: 'bg', label: 'Български' }
  ];

  constructor(@Inject(LOCALE_ID) public localeId: string) { }

  public changeLocale(lang: string) {
    let path = window.location.pathname;
    const pattern = /\/(en|bg)\/?/;
    if (path.match(pattern)) {
      path = path.replace(pattern, `/${lang}/`);
    } else {
      path = `/${lang}${path}`;
    }
    window.location.href = window.location.origin + path;
  }
}
