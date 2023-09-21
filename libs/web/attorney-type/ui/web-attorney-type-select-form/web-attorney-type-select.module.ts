

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAttorneyTypeFeatureStore } from '@case-clinical/web/attorney-type/shared'
import { WebAttorneyTypeSelectComponent } from './web-attorney-type-select.component'
import { WebAttorneyTypeSelectTableViewComponent } from './web-attorney-type-select-table-view.component'
import { WebFormsUiAttorneyTypeComponent } from './web-attorney-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAttorneyTypeGridComponent } from './web-attorney-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiAttorneyTypeComponent, 
        WebAttorneyTypeSelectTableViewComponent, 
        WebAttorneyTypeSelectComponent,
        WebAttorneyTypeGridComponent
    ],
  declarations: [
        WebFormsUiAttorneyTypeComponent, 
        WebAttorneyTypeSelectTableViewComponent, 
        WebAttorneyTypeSelectComponent,
        WebAttorneyTypeGridComponent
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
          name: 'attorney-type-select',
          component: WebAttorneyTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'attorney-type-grid',
          component: WebAttorneyTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAttorneyTypeFeatureStore],
})
export class WebFormsUiAttorneyTypeSelectModule {}
