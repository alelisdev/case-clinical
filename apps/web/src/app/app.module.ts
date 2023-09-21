import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebShellFeatureModule } from '@case-clinical/web/shell/feature'
import * as moment from 'moment';
import { AppComponent } from './app.component'
import { LocationStrategy, PathLocationStrategy } from '@angular/common'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, WebCoreFeatureModule, WebShellFeatureModule],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy} ,{ provide: 'moment', useValue: moment }],
  bootstrap: [AppComponent],
})
export class AppModule {}