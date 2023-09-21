

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCountryFeatureStore } from '@case-clinical/web/country/shared'
import { WebCountrySelectComponent } from './web-country-select.component'
import { WebCountrySelectTableViewComponent } from './web-country-select-table-view.component'
import { WebFormsUiCountryComponent } from './web-country-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCountryGridComponent } from './web-country-grid.component'

@NgModule({
  exports: [
        WebFormsUiCountryComponent, 
        WebCountrySelectTableViewComponent, 
        WebCountrySelectComponent,
        WebCountryGridComponent
    ],
  declarations: [
        WebFormsUiCountryComponent, 
        WebCountrySelectTableViewComponent, 
        WebCountrySelectComponent,
        WebCountryGridComponent
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
          name: 'country-select',
          component: WebCountrySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'country-grid',
          component: WebCountryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCountryFeatureStore],
})
export class WebFormsUiCountrySelectModule {}
