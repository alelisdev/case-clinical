

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTeamUserFeatureStore } from '@case-clinical/web/team-user/shared'
import { WebTeamUserSelectComponent } from './web-team-user-select.component'
import { WebTeamUserSelectTableViewComponent } from './web-team-user-select-table-view.component'
import { WebFormsUiTeamUserComponent } from './web-team-user-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTeamUserGridComponent } from './web-team-user-grid.component'

@NgModule({
  exports: [
        WebFormsUiTeamUserComponent, 
        WebTeamUserSelectTableViewComponent, 
        WebTeamUserSelectComponent,
        WebTeamUserGridComponent
    ],
  declarations: [
        WebFormsUiTeamUserComponent, 
        WebTeamUserSelectTableViewComponent, 
        WebTeamUserSelectComponent,
        WebTeamUserGridComponent
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
          name: 'team-user-select',
          component: WebTeamUserSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'team-user-grid',
          component: WebTeamUserGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTeamUserFeatureStore],
})
export class WebFormsUiTeamUserSelectModule {}
