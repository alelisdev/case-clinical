

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebEthnicityFeatureStore } from '@case-clinical/web/ethnicity/shared'
import { WebEthnicitySelectComponent } from './web-ethnicity-select.component'
import { WebEthnicitySelectTableViewComponent } from './web-ethnicity-select-table-view.component'
import { WebFormsUiEthnicityComponent } from './web-ethnicity-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebEthnicityGridComponent } from './web-ethnicity-grid.component'

@NgModule({
  exports: [
        WebFormsUiEthnicityComponent, 
        WebEthnicitySelectTableViewComponent, 
        WebEthnicitySelectComponent,
        WebEthnicityGridComponent
    ],
  declarations: [
        WebFormsUiEthnicityComponent, 
        WebEthnicitySelectTableViewComponent, 
        WebEthnicitySelectComponent,
        WebEthnicityGridComponent
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
          name: 'ethnicity-select',
          component: WebEthnicitySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'ethnicity-grid',
          component: WebEthnicityGridComponent,
        }
      ],
    }),
  ],
  providers: [WebEthnicityFeatureStore],
})
export class WebFormsUiEthnicitySelectModule {}
