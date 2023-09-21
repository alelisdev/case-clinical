

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebEducationFeatureStore } from '@case-clinical/web/education/shared'
import { WebEducationSelectComponent } from './web-education-select.component'
import { WebEducationSelectTableViewComponent } from './web-education-select-table-view.component'
import { WebFormsUiEducationComponent } from './web-education-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebEducationGridComponent } from './web-education-grid.component'

@NgModule({
  exports: [
        WebFormsUiEducationComponent, 
        WebEducationSelectTableViewComponent, 
        WebEducationSelectComponent,
        WebEducationGridComponent
    ],
  declarations: [
        WebFormsUiEducationComponent, 
        WebEducationSelectTableViewComponent, 
        WebEducationSelectComponent,
        WebEducationGridComponent
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
          name: 'education-select',
          component: WebEducationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'education-grid',
          component: WebEducationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebEducationFeatureStore],
})
export class WebFormsUiEducationSelectModule {}
