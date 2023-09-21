

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthorizationProcedureCodeFeatureStore } from '@case-clinical/web/prior-authorization-procedure-code/shared'
import { WebPriorAuthorizationProcedureCodeSelectComponent } from './web-prior-authorization-procedure-code-select.component'
import { WebPriorAuthorizationProcedureCodeSelectTableViewComponent } from './web-prior-authorization-procedure-code-select-table-view.component'
import { WebFormsUiPriorAuthorizationProcedureCodeComponent } from './web-prior-authorization-procedure-code-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthorizationProcedureCodeGridComponent } from './web-prior-authorization-procedure-code-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthorizationProcedureCodeComponent, 
        WebPriorAuthorizationProcedureCodeSelectTableViewComponent, 
        WebPriorAuthorizationProcedureCodeSelectComponent,
        WebPriorAuthorizationProcedureCodeGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthorizationProcedureCodeComponent, 
        WebPriorAuthorizationProcedureCodeSelectTableViewComponent, 
        WebPriorAuthorizationProcedureCodeSelectComponent,
        WebPriorAuthorizationProcedureCodeGridComponent
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
          name: 'prior-authorization-procedure-code-select',
          component: WebPriorAuthorizationProcedureCodeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-authorization-procedure-code-grid',
          component: WebPriorAuthorizationProcedureCodeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthorizationProcedureCodeFeatureStore],
})
export class WebFormsUiPriorAuthorizationProcedureCodeSelectModule {}
