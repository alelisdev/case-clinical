

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRoleFeatureStore } from '@case-clinical/web/role/shared'
import { WebRoleSelectComponent } from './web-role-select.component'
import { WebRoleSelectTableViewComponent } from './web-role-select-table-view.component'
import { WebFormsUiRoleComponent } from './web-role-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRoleGridComponent } from './web-role-grid.component'

@NgModule({
  exports: [
        WebFormsUiRoleComponent, 
        WebRoleSelectTableViewComponent, 
        WebRoleSelectComponent,
        WebRoleGridComponent
    ],
  declarations: [
        WebFormsUiRoleComponent, 
        WebRoleSelectTableViewComponent, 
        WebRoleSelectComponent,
        WebRoleGridComponent
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
          name: 'role-select',
          component: WebRoleSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'role-grid',
          component: WebRoleGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRoleFeatureStore],
})
export class WebFormsUiRoleSelectModule {}
