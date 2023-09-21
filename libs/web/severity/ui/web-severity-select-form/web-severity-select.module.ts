

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebSeverityFeatureStore } from '@case-clinical/web/severity/shared'
import { WebSeveritySelectComponent } from './web-severity-select.component'
import { WebSeveritySelectTableViewComponent } from './web-severity-select-table-view.component'
import { WebFormsUiSeverityComponent } from './web-severity-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebSeverityGridComponent } from './web-severity-grid.component'

@NgModule({
  exports: [
        WebFormsUiSeverityComponent, 
        WebSeveritySelectTableViewComponent, 
        WebSeveritySelectComponent,
        WebSeverityGridComponent
    ],
  declarations: [
        WebFormsUiSeverityComponent, 
        WebSeveritySelectTableViewComponent, 
        WebSeveritySelectComponent,
        WebSeverityGridComponent
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
          name: 'severity-select',
          component: WebSeveritySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'severity-grid',
          component: WebSeverityGridComponent,
        }
      ],
    }),
  ],
  providers: [WebSeverityFeatureStore],
})
export class WebFormsUiSeveritySelectModule {}
