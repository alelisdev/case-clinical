

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
import { WebGenderSelectComponent } from './web-gender-select.component'
import { WebGenderSelectTableViewComponent } from './web-gender-select-table-view.component'
import { WebFormsUiGenderComponent } from './web-gender-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebGenderGridComponent } from './web-gender-grid.component'

@NgModule({
  exports: [
        WebFormsUiGenderComponent, 
        WebGenderSelectTableViewComponent, 
        WebGenderSelectComponent,
        WebGenderGridComponent
    ],
  declarations: [
        WebFormsUiGenderComponent, 
        WebGenderSelectTableViewComponent, 
        WebGenderSelectComponent,
        WebGenderGridComponent
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
          name: 'gender-select',
          component: WebGenderSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'gender-grid',
          component: WebGenderGridComponent,
        }
      ],
    }),
  ],
  providers: [WebGenderFeatureStore],
})
export class WebFormsUiGenderSelectModule {}
