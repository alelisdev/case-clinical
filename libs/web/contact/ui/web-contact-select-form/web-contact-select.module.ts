

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import { WebContactSelectComponent } from './web-contact-select.component'
import { WebContactSelectTableViewComponent } from './web-contact-select-table-view.component'
import { WebFormsUiContactComponent } from './web-contact-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContactGridComponent } from './web-contact-grid.component'

@NgModule({
  exports: [
        WebFormsUiContactComponent, 
        WebContactSelectTableViewComponent, 
        WebContactSelectComponent,
        WebContactGridComponent
    ],
  declarations: [
        WebFormsUiContactComponent, 
        WebContactSelectTableViewComponent, 
        WebContactSelectComponent,
        WebContactGridComponent
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
          name: 'contact-select',
          component: WebContactSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contact-grid',
          component: WebContactGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContactFeatureStore],
})
export class WebFormsUiContactSelectModule {}
