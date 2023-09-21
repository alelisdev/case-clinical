

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { WebPriorAuthorizationRequestSelectComponent } from './web-prior-authorization-request-select.component'
import { WebPriorAuthorizationRequestSelectTableViewComponent } from './web-prior-authorization-request-select-table-view.component'
import { WebFormsUiPriorAuthorizationRequestComponent } from './web-prior-authorization-request-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthorizationRequestGridComponent } from './web-prior-authorization-request-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthorizationRequestComponent, 
        WebPriorAuthorizationRequestSelectTableViewComponent, 
        WebPriorAuthorizationRequestSelectComponent,
        WebPriorAuthorizationRequestGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthorizationRequestComponent, 
        WebPriorAuthorizationRequestSelectTableViewComponent, 
        WebPriorAuthorizationRequestSelectComponent,
        WebPriorAuthorizationRequestGridComponent
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
          name: 'prior-authorization-request-select',
          component: WebPriorAuthorizationRequestSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-authorization-request-grid',
          component: WebPriorAuthorizationRequestGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthorizationRequestFeatureStore],
})
export class WebFormsUiPriorAuthorizationRequestSelectModule {}
