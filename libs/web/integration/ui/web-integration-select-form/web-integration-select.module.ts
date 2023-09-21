

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebIntegrationFeatureStore } from '@case-clinical/web/integration/shared'
import { WebIntegrationSelectComponent } from './web-integration-select.component'
import { WebIntegrationSelectTableViewComponent } from './web-integration-select-table-view.component'
import { WebFormsUiIntegrationComponent } from './web-integration-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebIntegrationGridComponent } from './web-integration-grid.component'

@NgModule({
  exports: [
        WebFormsUiIntegrationComponent, 
        WebIntegrationSelectTableViewComponent, 
        WebIntegrationSelectComponent,
        WebIntegrationGridComponent
    ],
  declarations: [
        WebFormsUiIntegrationComponent, 
        WebIntegrationSelectTableViewComponent, 
        WebIntegrationSelectComponent,
        WebIntegrationGridComponent
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
          name: 'integration-select',
          component: WebIntegrationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'integration-grid',
          component: WebIntegrationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebIntegrationFeatureStore],
})
export class WebFormsUiIntegrationSelectModule {}
