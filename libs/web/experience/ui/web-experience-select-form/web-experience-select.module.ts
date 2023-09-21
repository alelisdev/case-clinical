

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebExperienceFeatureStore } from '@case-clinical/web/experience/shared'
import { WebExperienceSelectComponent } from './web-experience-select.component'
import { WebExperienceSelectTableViewComponent } from './web-experience-select-table-view.component'
import { WebFormsUiExperienceComponent } from './web-experience-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebExperienceGridComponent } from './web-experience-grid.component'

@NgModule({
  exports: [
        WebFormsUiExperienceComponent, 
        WebExperienceSelectTableViewComponent, 
        WebExperienceSelectComponent,
        WebExperienceGridComponent
    ],
  declarations: [
        WebFormsUiExperienceComponent, 
        WebExperienceSelectTableViewComponent, 
        WebExperienceSelectComponent,
        WebExperienceGridComponent
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
          name: 'experience-select',
          component: WebExperienceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'experience-grid',
          component: WebExperienceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebExperienceFeatureStore],
})
export class WebFormsUiExperienceSelectModule {}
