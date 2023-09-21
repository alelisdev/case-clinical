

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAwardFeatureStore } from '@case-clinical/web/award/shared'
import { WebAwardSelectComponent } from './web-award-select.component'
import { WebAwardSelectTableViewComponent } from './web-award-select-table-view.component'
import { WebFormsUiAwardComponent } from './web-award-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAwardGridComponent } from './web-award-grid.component'

@NgModule({
  exports: [
        WebFormsUiAwardComponent, 
        WebAwardSelectTableViewComponent, 
        WebAwardSelectComponent,
        WebAwardGridComponent
    ],
  declarations: [
        WebFormsUiAwardComponent, 
        WebAwardSelectTableViewComponent, 
        WebAwardSelectComponent,
        WebAwardGridComponent
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
          name: 'award-select',
          component: WebAwardSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'award-grid',
          component: WebAwardGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAwardFeatureStore],
})
export class WebFormsUiAwardSelectModule {}
