import { enableProdMode } from '@angular/core';

import { environment } from '../../common/src/environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';

export { renderModule } from '@angular/platform-server';
