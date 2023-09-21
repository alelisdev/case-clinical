

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'
import { WebMedLevelSelectComponent } from './web-med-level-select.component'
import { WebMedLevelSelectTableViewComponent } from './web-med-level-select-table-view.component'
import { WebFormsUiMedLevelComponent } from './web-med-level-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebMedLevelGridComponent } from './web-med-level-grid.component'

@NgModule({
  exports: [
        WebFormsUiMedLevelComponent, 
        WebMedLevelSelectTableViewComponent, 
        WebMedLevelSelectComponent,
        WebMedLevelGridComponent
    ],
  declarations: [
        WebFormsUiMedLevelComponent, 
        WebMedLevelSelectTableViewComponent, 
        WebMedLevelSelectComponent,
        WebMedLevelGridComponent
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
          name: 'med-level-select',
          component: WebMedLevelSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'med-level-grid',
          component: WebMedLevelGridComponent,
        }
      ],
    }),
  ],
  providers: [WebMedLevelFeatureStore],
})
export class WebFormsUiMedLevelSelectModule {}
