

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { WebAttorneySelectComponent } from './web-attorney-select.component'
import { WebAttorneySelectTableViewComponent } from './web-attorney-select-table-view.component'
import { WebFormsUiAttorneyComponent } from './web-attorney-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAttorneyGridComponent } from './web-attorney-grid.component'

@NgModule({
  exports: [
        WebFormsUiAttorneyComponent,
        WebAttorneySelectTableViewComponent,
        WebAttorneySelectComponent,
        WebAttorneyGridComponent
    ],
  declarations: [
        WebFormsUiAttorneyComponent,
        WebAttorneySelectTableViewComponent,
        WebAttorneySelectComponent,
        WebAttorneyGridComponent
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
          name: 'attorney-select',
          component: WebAttorneySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'attorney-grid',
          component: WebAttorneyGridComponent,
        }
      ],
    }),
  ],

})
export class WebFormsUiAttorneySelectModule {}
