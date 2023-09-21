

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebServiceFeatureStore } from '@case-clinical/web/service/shared'
import { WebServiceSelectComponent } from './web-service-select.component'
import { WebServiceSelectTableViewComponent } from './web-service-select-table-view.component'
import { WebFormsUiServiceComponent } from './web-service-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebServiceGridComponent } from './web-service-grid.component'

@NgModule({
  exports: [
        WebFormsUiServiceComponent, 
        WebServiceSelectTableViewComponent, 
        WebServiceSelectComponent,
        WebServiceGridComponent
    ],
  declarations: [
        WebFormsUiServiceComponent, 
        WebServiceSelectTableViewComponent, 
        WebServiceSelectComponent,
        WebServiceGridComponent
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
          name: 'service-select',
          component: WebServiceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'service-grid',
          component: WebServiceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebServiceFeatureStore],
})
export class WebFormsUiServiceSelectModule {}
