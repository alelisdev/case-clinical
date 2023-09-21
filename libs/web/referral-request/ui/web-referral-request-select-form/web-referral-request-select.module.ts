

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'
import { WebReferralRequestSelectComponent } from './web-referral-request-select.component'
import { WebReferralRequestSelectTableViewComponent } from './web-referral-request-select-table-view.component'
import { WebFormsUiReferralRequestComponent } from './web-referral-request-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebReferralRequestGridComponent } from './web-referral-request-grid.component'

@NgModule({
  exports: [
        WebFormsUiReferralRequestComponent, 
        WebReferralRequestSelectTableViewComponent, 
        WebReferralRequestSelectComponent,
        WebReferralRequestGridComponent
    ],
  declarations: [
        WebFormsUiReferralRequestComponent, 
        WebReferralRequestSelectTableViewComponent, 
        WebReferralRequestSelectComponent,
        WebReferralRequestGridComponent
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
          name: 'referral-request-select',
          component: WebReferralRequestSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'referral-request-grid',
          component: WebReferralRequestGridComponent,
        }
      ],
    }),
  ],
  providers: [WebReferralRequestFeatureStore],
})
export class WebFormsUiReferralRequestSelectModule {}
