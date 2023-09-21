

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRoleFeaturePermissionFeatureStore } from '@case-clinical/web/role-feature-permission/shared'
import { WebRoleFeaturePermissionSelectComponent } from './web-role-feature-permission-select.component'
import { WebRoleFeaturePermissionSelectTableViewComponent } from './web-role-feature-permission-select-table-view.component'
import { WebFormsUiRoleFeaturePermissionComponent } from './web-role-feature-permission-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  exports: [
        WebFormsUiRoleFeaturePermissionComponent, 
        WebRoleFeaturePermissionSelectTableViewComponent, 
        WebRoleFeaturePermissionSelectComponent
    ],
  declarations: [
        WebFormsUiRoleFeaturePermissionComponent, 
        WebRoleFeaturePermissionSelectTableViewComponent, 
        WebRoleFeaturePermissionSelectComponent
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
          name: 'role-feature-permission-select',
          component: WebRoleFeaturePermissionSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
  providers: [WebRoleFeaturePermissionFeatureStore],
})
export class WebFormsUiRoleFeaturePermissionSelectModule {}
