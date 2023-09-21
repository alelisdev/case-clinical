

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'
import { WebPlaceOfServiceSelectComponent } from './web-place-of-service-select.component'
import { WebPlaceOfServiceSelectTableViewComponent } from './web-place-of-service-select-table-view.component'
import { WebFormsUiPlaceOfServiceComponent } from './web-place-of-service-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPlaceOfServiceGridComponent } from './web-place-of-service-grid.component'

@NgModule({
  exports: [
        WebFormsUiPlaceOfServiceComponent, 
        WebPlaceOfServiceSelectTableViewComponent, 
        WebPlaceOfServiceSelectComponent,
        WebPlaceOfServiceGridComponent
    ],
  declarations: [
        WebFormsUiPlaceOfServiceComponent, 
        WebPlaceOfServiceSelectTableViewComponent, 
        WebPlaceOfServiceSelectComponent,
        WebPlaceOfServiceGridComponent
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
          name: 'place-of-service-select',
          component: WebPlaceOfServiceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'place-of-service-grid',
          component: WebPlaceOfServiceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPlaceOfServiceFeatureStore],
})
export class WebFormsUiPlaceOfServiceSelectModule {}
