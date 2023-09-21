

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebGuidelineUsedFeatureStore } from '@case-clinical/web/guideline-used/shared'
import { WebGuidelineUsedSelectComponent } from './web-guideline-used-select.component'
import { WebGuidelineUsedSelectTableViewComponent } from './web-guideline-used-select-table-view.component'
import { WebFormsUiGuidelineUsedComponent } from './web-guideline-used-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebGuidelineUsedGridComponent } from './web-guideline-used-grid.component'

@NgModule({
  exports: [
        WebFormsUiGuidelineUsedComponent, 
        WebGuidelineUsedSelectTableViewComponent, 
        WebGuidelineUsedSelectComponent,
        WebGuidelineUsedGridComponent
    ],
  declarations: [
        WebFormsUiGuidelineUsedComponent, 
        WebGuidelineUsedSelectTableViewComponent, 
        WebGuidelineUsedSelectComponent,
        WebGuidelineUsedGridComponent
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
          name: 'guideline-used-select',
          component: WebGuidelineUsedSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'guideline-used-grid',
          component: WebGuidelineUsedGridComponent,
        }
      ],
    }),
  ],
  providers: [WebGuidelineUsedFeatureStore],
})
export class WebFormsUiGuidelineUsedSelectModule {}
