

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTeamFeatureStore } from '@case-clinical/web/team/shared'
import { WebTeamSelectComponent } from './web-team-select.component'
import { WebTeamSelectTableViewComponent } from './web-team-select-table-view.component'
import { WebFormsUiTeamComponent } from './web-team-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTeamGridComponent } from './web-team-grid.component'

@NgModule({
  exports: [
        WebFormsUiTeamComponent, 
        WebTeamSelectTableViewComponent, 
        WebTeamSelectComponent,
        WebTeamGridComponent
    ],
  declarations: [
        WebFormsUiTeamComponent, 
        WebTeamSelectTableViewComponent, 
        WebTeamSelectComponent,
        WebTeamGridComponent
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
          name: 'team-select',
          component: WebTeamSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'team-grid',
          component: WebTeamGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTeamFeatureStore],
})
export class WebFormsUiTeamSelectModule {}
