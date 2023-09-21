import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { environment } from '@case-clinical/web/core/feature'

import { AppModule } from './app/app.module'

import {LicenseManager} from '@ag-grid-enterprise/core';
LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE);

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
