

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContactPhoneNumberFeatureStore } from '@case-clinical/web/contact-phone-number/shared'
import { WebContactPhoneNumberSelectComponent } from './web-contact-phone-number-select.component'
import { WebContactPhoneNumberSelectTableViewComponent } from './web-contact-phone-number-select-table-view.component'
import { WebFormsUiContactPhoneNumberComponent } from './web-contact-phone-number-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContactPhoneNumberGridComponent } from './web-contact-phone-number-grid.component'

@NgModule({
  exports: [
        WebFormsUiContactPhoneNumberComponent, 
        WebContactPhoneNumberSelectTableViewComponent, 
        WebContactPhoneNumberSelectComponent,
        WebContactPhoneNumberGridComponent
    ],
  declarations: [
        WebFormsUiContactPhoneNumberComponent, 
        WebContactPhoneNumberSelectTableViewComponent, 
        WebContactPhoneNumberSelectComponent,
        WebContactPhoneNumberGridComponent
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
          name: 'contact-phone-number-select',
          component: WebContactPhoneNumberSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contact-phone-number-grid',
          component: WebContactPhoneNumberGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContactPhoneNumberFeatureStore],
})
export class WebFormsUiContactPhoneNumberSelectModule {}
