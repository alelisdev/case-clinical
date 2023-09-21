

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebUserCourseProgressFeatureStore } from '@case-clinical/web/user-course-progress/shared'
import { WebUserCourseProgressSelectComponent } from './web-user-course-progress-select.component'
import { WebUserCourseProgressSelectTableViewComponent } from './web-user-course-progress-select-table-view.component'
import { WebFormsUiUserCourseProgressComponent } from './web-user-course-progress-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  exports: [
        WebFormsUiUserCourseProgressComponent, 
        WebUserCourseProgressSelectTableViewComponent, 
        WebUserCourseProgressSelectComponent
    ],
  declarations: [
        WebFormsUiUserCourseProgressComponent, 
        WebUserCourseProgressSelectTableViewComponent, 
        WebUserCourseProgressSelectComponent
    ],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'user-course-progress-select',
          component: WebUserCourseProgressSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
  providers: [WebUserCourseProgressFeatureStore],
})
export class WebFormsUiUserCourseProgressSelectModule {}
