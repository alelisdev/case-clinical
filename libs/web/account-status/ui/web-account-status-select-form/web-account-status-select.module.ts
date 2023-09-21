

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAccountStatusFeatureStore } from '@case-clinical/web/account-status/shared'
import { WebAccountStatusSelectComponent } from './web-account-status-select.component'
import { WebAccountStatusSelectTableViewComponent } from './web-account-status-select-table-view.component'
import { WebFormsUiAccountStatusComponent } from './web-account-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAccountStatusGridComponent } from './web-account-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiAccountStatusComponent, 
        WebAccountStatusSelectTableViewComponent, 
        WebAccountStatusSelectComponent,
        WebAccountStatusGridComponent
    ],
  declarations: [
        WebFormsUiAccountStatusComponent, 
        WebAccountStatusSelectTableViewComponent, 
        WebAccountStatusSelectComponent,
        WebAccountStatusGridComponent
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
          name: 'account-status-select',
          component: WebAccountStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'account-status-grid',
          component: WebAccountStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAccountStatusFeatureStore],
})
export class WebFormsUiAccountStatusSelectModule {}
