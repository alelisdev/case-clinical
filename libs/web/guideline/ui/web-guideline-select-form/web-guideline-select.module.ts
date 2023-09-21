

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebGuidelineFeatureStore } from '@case-clinical/web/guideline/shared'
import { WebGuidelineSelectComponent } from './web-guideline-select.component'
import { WebGuidelineSelectTableViewComponent } from './web-guideline-select-table-view.component'
import { WebFormsUiGuidelineComponent } from './web-guideline-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebGuidelineGridComponent } from './web-guideline-grid.component'

@NgModule({
  exports: [
        WebFormsUiGuidelineComponent, 
        WebGuidelineSelectTableViewComponent, 
        WebGuidelineSelectComponent,
        WebGuidelineGridComponent
    ],
  declarations: [
        WebFormsUiGuidelineComponent, 
        WebGuidelineSelectTableViewComponent, 
        WebGuidelineSelectComponent,
        WebGuidelineGridComponent
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
          name: 'guideline-select',
          component: WebGuidelineSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'guideline-grid',
          component: WebGuidelineGridComponent,
        }
      ],
    }),
  ],
  providers: [WebGuidelineFeatureStore],
})
export class WebFormsUiGuidelineSelectModule {}
