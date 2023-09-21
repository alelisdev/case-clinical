

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAuthorizationStatusFeatureStore } from '@case-clinical/web/authorization-status/shared'
import { WebAuthorizationStatusSelectComponent } from './web-authorization-status-select.component'
import { WebAuthorizationStatusSelectTableViewComponent } from './web-authorization-status-select-table-view.component'
import { WebFormsUiAuthorizationStatusComponent } from './web-authorization-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAuthorizationStatusGridComponent } from './web-authorization-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiAuthorizationStatusComponent, 
        WebAuthorizationStatusSelectTableViewComponent, 
        WebAuthorizationStatusSelectComponent,
        WebAuthorizationStatusGridComponent
    ],
  declarations: [
        WebFormsUiAuthorizationStatusComponent, 
        WebAuthorizationStatusSelectTableViewComponent, 
        WebAuthorizationStatusSelectComponent,
        WebAuthorizationStatusGridComponent
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
          name: 'authorization-status-select',
          component: WebAuthorizationStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'authorization-status-grid',
          component: WebAuthorizationStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAuthorizationStatusFeatureStore],
})
export class WebFormsUiAuthorizationStatusSelectModule {}
