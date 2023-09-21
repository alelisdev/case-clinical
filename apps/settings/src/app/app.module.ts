import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebSettingsShellFeatureModule } from '@case-clinical/settings/shell/feature'

import { AppComponent } from './app.component'
import { LocationStrategy, PathLocationStrategy } from '@angular/common'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, WebCoreFeatureModule, WebSettingsShellFeatureModule],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
