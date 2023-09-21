

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { WebClaimSelectComponent } from './web-claim-select.component'
import { WebClaimSelectTableViewComponent } from './web-claim-select-table-view.component'
import { WebFormsUiClaimComponent } from './web-claim-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClaimGridComponent } from './web-claim-grid.component'

@NgModule({
  exports: [
        WebFormsUiClaimComponent, 
        WebClaimSelectTableViewComponent, 
        WebClaimSelectComponent,
        WebClaimGridComponent
    ],
  declarations: [
        WebFormsUiClaimComponent, 
        WebClaimSelectTableViewComponent, 
        WebClaimSelectComponent,
        WebClaimGridComponent
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
          name: 'claim-select',
          component: WebClaimSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'claim-grid',
          component: WebClaimGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClaimFeatureStore],
})
export class WebFormsUiClaimSelectModule {}
