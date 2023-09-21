

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContactEmailFeatureStore } from '@case-clinical/web/contact-email/shared'
import { WebContactEmailSelectComponent } from './web-contact-email-select.component'
import { WebContactEmailSelectTableViewComponent } from './web-contact-email-select-table-view.component'
import { WebFormsUiContactEmailComponent } from './web-contact-email-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContactEmailGridComponent } from './web-contact-email-grid.component'

@NgModule({
  exports: [
        WebFormsUiContactEmailComponent, 
        WebContactEmailSelectTableViewComponent, 
        WebContactEmailSelectComponent,
        WebContactEmailGridComponent
    ],
  declarations: [
        WebFormsUiContactEmailComponent, 
        WebContactEmailSelectTableViewComponent, 
        WebContactEmailSelectComponent,
        WebContactEmailGridComponent
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
          name: 'contact-email-select',
          component: WebContactEmailSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contact-email-grid',
          component: WebContactEmailGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContactEmailFeatureStore],
})
export class WebFormsUiContactEmailSelectModule {}
