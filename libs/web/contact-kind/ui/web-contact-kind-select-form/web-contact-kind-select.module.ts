

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContactKindFeatureStore } from '@case-clinical/web/contact-kind/shared'
import { WebContactKindSelectComponent } from './web-contact-kind-select.component'
import { WebContactKindSelectTableViewComponent } from './web-contact-kind-select-table-view.component'
import { WebFormsUiContactKindComponent } from './web-contact-kind-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContactKindGridComponent } from './web-contact-kind-grid.component'

@NgModule({
  exports: [
        WebFormsUiContactKindComponent, 
        WebContactKindSelectTableViewComponent, 
        WebContactKindSelectComponent,
        WebContactKindGridComponent
    ],
  declarations: [
        WebFormsUiContactKindComponent, 
        WebContactKindSelectTableViewComponent, 
        WebContactKindSelectComponent,
        WebContactKindGridComponent
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
          name: 'contact-kind-select',
          component: WebContactKindSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contact-kind-grid',
          component: WebContactKindGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContactKindFeatureStore],
})
export class WebFormsUiContactKindSelectModule {}
