

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClaimProcedureFeatureStore } from '@case-clinical/web/claim-procedure/shared'
import { WebClaimProcedureSelectComponent } from './web-claim-procedure-select.component'
import { WebClaimProcedureSelectTableViewComponent } from './web-claim-procedure-select-table-view.component'
import { WebFormsUiClaimProcedureComponent } from './web-claim-procedure-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClaimProcedureGridComponent } from './web-claim-procedure-grid.component'

@NgModule({
  exports: [
        WebFormsUiClaimProcedureComponent, 
        WebClaimProcedureSelectTableViewComponent, 
        WebClaimProcedureSelectComponent,
        WebClaimProcedureGridComponent
    ],
  declarations: [
        WebFormsUiClaimProcedureComponent, 
        WebClaimProcedureSelectTableViewComponent, 
        WebClaimProcedureSelectComponent,
        WebClaimProcedureGridComponent
    ],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiGridModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'claim-procedure-select',
          component: WebClaimProcedureSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'claim-procedure-grid',
          component: WebClaimProcedureGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClaimProcedureFeatureStore],
})
export class WebFormsUiClaimProcedureSelectModule {}
