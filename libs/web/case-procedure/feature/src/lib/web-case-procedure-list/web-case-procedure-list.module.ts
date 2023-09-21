

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AgGridModule } from '@ag-grid-community/angular'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebCaseProcedureListComponent } from './web-case-procedure-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'

@NgModule({
  declarations: [WebCaseProcedureListComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([{ path: '', component: WebCaseProcedureListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
  ],
})
export class WebCaseProcedureListModule {}

