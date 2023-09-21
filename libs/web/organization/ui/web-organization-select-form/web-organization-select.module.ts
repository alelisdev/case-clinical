

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import { WebOrganizationSelectComponent } from './web-organization-select.component'
import { WebOrganizationSelectTableViewComponent } from './web-organization-select-table-view.component'
import { WebFormsUiOrganizationComponent } from './web-organization-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebOrganizationGridComponent } from './web-organization-grid.component'

@NgModule({
  exports: [
        WebFormsUiOrganizationComponent, 
        WebOrganizationSelectTableViewComponent, 
        WebOrganizationSelectComponent,
        WebOrganizationGridComponent
    ],
  declarations: [
        WebFormsUiOrganizationComponent, 
        WebOrganizationSelectTableViewComponent, 
        WebOrganizationSelectComponent,
        WebOrganizationGridComponent
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
          name: 'organization-select',
          component: WebOrganizationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'organization-grid',
          component: WebOrganizationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebOrganizationFeatureStore],
})
export class WebFormsUiOrganizationSelectModule {}
