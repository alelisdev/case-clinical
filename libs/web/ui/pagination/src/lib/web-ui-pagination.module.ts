import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiPaginationComponent } from './web-ui-pagination.component'

import {WebUiLaIconModule} from '../../../la-icon/src/index';

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule,WebUiLaIconModule],
  declarations: [WebUiPaginationComponent],
  exports: [WebUiPaginationComponent],
})
export class WebUiPaginationModule {}
