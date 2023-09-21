

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRolePermissionFeatureStore } from '@case-clinical/web/role-permission/shared'
import { WebRolePermissionSelectComponent } from './web-role-permission-select.component'
import { WebRolePermissionSelectTableViewComponent } from './web-role-permission-select-table-view.component'
import { WebFormsUiRolePermissionComponent } from './web-role-permission-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRolePermissionGridComponent } from './web-role-permission-grid.component'

@NgModule({
  exports: [
        WebFormsUiRolePermissionComponent, 
        WebRolePermissionSelectTableViewComponent, 
        WebRolePermissionSelectComponent,
        WebRolePermissionGridComponent
    ],
  declarations: [
        WebFormsUiRolePermissionComponent, 
        WebRolePermissionSelectTableViewComponent, 
        WebRolePermissionSelectComponent,
        WebRolePermissionGridComponent
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
          name: 'role-permission-select',
          component: WebRolePermissionSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'role-permission-grid',
          component: WebRolePermissionGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRolePermissionFeatureStore],
})
export class WebFormsUiRolePermissionSelectModule {}
