

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebFormsUiUserFeaturePermissionComponent } from './web-user-feature-permission-ui-form.component'
import { WebUserFeaturePermissionTableViewComponent } from './web-user-feature-permission-table-view.component'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { FormlyModule } from '@ngx-formly/core'
import { UserFeaturePermissionSelectComponent } from './user-feature-permission-select/user-feature-permission-select.component'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from 'libs/web/ui/form/src/lib/wrappers/form-field/ui-form-field.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  exports: [WebFormsUiUserFeaturePermissionComponent, WebUserFeaturePermissionTableViewComponent, UserFeaturePermissionSelectComponent],
  declarations: [WebFormsUiUserFeaturePermissionComponent, WebUserFeaturePermissionTableViewComponent, UserFeaturePermissionSelectComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    WebUiFormModule,
    WebUiButtonModule, 
    WebUiPageHeaderModule,
    WebUiPageModule, 
    WebUiPanelModule, 
    WebCoreFeatureModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'user-feature-permission-select',
          component: UserFeaturePermissionSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ]
})
export class WebFormsUiUserFeaturePermissionModule {}
