

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebUserRoleFeatureStore } from '@case-clinical/web/user-role/shared'
import { WebUserRoleSelectComponent } from './web-user-role-select.component'
import { WebUserRoleSelectTableViewComponent } from './web-user-role-select-table-view.component'
import { WebFormsUiUserRoleComponent } from './web-user-role-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebUserRoleGridComponent } from './web-user-role-grid.component'

@NgModule({
  exports: [
        WebFormsUiUserRoleComponent, 
        WebUserRoleSelectTableViewComponent, 
        WebUserRoleSelectComponent,
        WebUserRoleGridComponent
    ],
  declarations: [
        WebFormsUiUserRoleComponent, 
        WebUserRoleSelectTableViewComponent, 
        WebUserRoleSelectComponent,
        WebUserRoleGridComponent
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
          name: 'user-role-select',
          component: WebUserRoleSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'user-role-grid',
          component: WebUserRoleGridComponent,
        }
      ],
    }),
  ],
  providers: [WebUserRoleFeatureStore],
})
export class WebFormsUiUserRoleSelectModule {}
