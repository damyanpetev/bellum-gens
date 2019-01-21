import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'steamCustomUrl'
})
export class SteamCustomUrlPipe implements PipeTransform {

  transform(customUrl: string): any {
    return 'https://steamcommunity.com/id/' + customUrl;
  }

}