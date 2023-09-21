

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebUserSelectComponent } from './web-user-select.component'
import { WebUserSelectTableViewComponent } from './web-user-select-table-view.component'
import { WebFormsUiUserComponent } from './web-user-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  exports: [
        WebFormsUiUserComponent, 
        WebUserSelectTableViewComponent, 
        WebUserSelectComponent
    ],
  declarations: [
        WebFormsUiUserComponent, 
        WebUserSelectTableViewComponent, 
        WebUserSelectComponent
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
          name: 'user-select',
          component: WebUserSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
  providers: [WebUserFeatureStore],
})
export class WebFormsUiUserSelectModule {}
