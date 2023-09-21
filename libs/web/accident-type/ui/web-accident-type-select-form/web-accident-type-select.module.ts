

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import { WebAccidentTypeSelectComponent } from './web-accident-type-select.component'
import { WebAccidentTypeSelectTableViewComponent } from './web-accident-type-select-table-view.component'
import { WebFormsUiAccidentTypeComponent } from './web-accident-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAccidentTypeGridComponent } from './web-accident-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiAccidentTypeComponent, 
        WebAccidentTypeSelectTableViewComponent, 
        WebAccidentTypeSelectComponent,
        WebAccidentTypeGridComponent
    ],
  declarations: [
        WebFormsUiAccidentTypeComponent, 
        WebAccidentTypeSelectTableViewComponent, 
        WebAccidentTypeSelectComponent,
        WebAccidentTypeGridComponent
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
          name: 'accident-type-select',
          component: WebAccidentTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'accident-type-grid',
          component: WebAccidentTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAccidentTypeFeatureStore],
})
export class WebFormsUiAccidentTypeSelectModule {}
