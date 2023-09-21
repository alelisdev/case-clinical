

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTeamRoleFeatureStore } from '@case-clinical/web/team-role/shared'
import { WebTeamRoleSelectComponent } from './web-team-role-select.component'
import { WebTeamRoleSelectTableViewComponent } from './web-team-role-select-table-view.component'
import { WebFormsUiTeamRoleComponent } from './web-team-role-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTeamRoleGridComponent } from './web-team-role-grid.component'

@NgModule({
  exports: [
        WebFormsUiTeamRoleComponent, 
        WebTeamRoleSelectTableViewComponent, 
        WebTeamRoleSelectComponent,
        WebTeamRoleGridComponent
    ],
  declarations: [
        WebFormsUiTeamRoleComponent, 
        WebTeamRoleSelectTableViewComponent, 
        WebTeamRoleSelectComponent,
        WebTeamRoleGridComponent
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
          name: 'team-role-select',
          component: WebTeamRoleSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'team-role-grid',
          component: WebTeamRoleGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTeamRoleFeatureStore],
})
export class WebFormsUiTeamRoleSelectModule {}
