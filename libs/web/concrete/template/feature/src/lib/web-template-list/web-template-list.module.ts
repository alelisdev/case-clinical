

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { AgGridModule } from 'ag-grid-angular'
import { WebTemplateListComponent } from './web-template-list.component'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiStackedListModule } from '@case-clinical/web/ui/stacked-list'
import { WebUiDropdownModule } from '@case-clinical/web/ui/dropdown'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiPaginationModule } from '@case-clinical/web/ui/pagination'
import { WebUiSearchModule } from '@case-clinical/web/ui/search'

@NgModule({
  declarations: [WebTemplateListComponent],
  imports: [
    WebUiPaginationModule,
    CommonModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiStackedListModule,
    WebUiIconModule,
    WebUiDropdownModule,
    WebUiButtonModule,
    WebUiSearchModule,
    WebUiPageHeaderModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([{ path: '', component: WebTemplateListComponent }]),

  ],
})
export class WebTemplateListModule {}

