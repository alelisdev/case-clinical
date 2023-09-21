

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClaimStatusFeatureStore } from '@case-clinical/web/claim-status/shared'
import { WebClaimStatusSelectComponent } from './web-claim-status-select.component'
import { WebClaimStatusSelectTableViewComponent } from './web-claim-status-select-table-view.component'
import { WebFormsUiClaimStatusComponent } from './web-claim-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClaimStatusGridComponent } from './web-claim-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiClaimStatusComponent, 
        WebClaimStatusSelectTableViewComponent, 
        WebClaimStatusSelectComponent,
        WebClaimStatusGridComponent
    ],
  declarations: [
        WebFormsUiClaimStatusComponent, 
        WebClaimStatusSelectTableViewComponent, 
        WebClaimStatusSelectComponent,
        WebClaimStatusGridComponent
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
          name: 'claim-status-select',
          component: WebClaimStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'claim-status-grid',
          component: WebClaimStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClaimStatusFeatureStore],
})
export class WebFormsUiClaimStatusSelectModule {}
