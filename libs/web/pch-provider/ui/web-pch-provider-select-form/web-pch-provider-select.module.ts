

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPchProviderFeatureStore } from '@case-clinical/web/pch-provider/shared'
import { WebPchProviderSelectComponent } from './web-pch-provider-select.component'
import { WebPchProviderSelectTableViewComponent } from './web-pch-provider-select-table-view.component'
import { WebFormsUiPchProviderComponent } from './web-pch-provider-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPchProviderGridComponent } from './web-pch-provider-grid.component'

@NgModule({
  exports: [
        WebFormsUiPchProviderComponent, 
        WebPchProviderSelectTableViewComponent, 
        WebPchProviderSelectComponent,
        WebPchProviderGridComponent
    ],
  declarations: [
        WebFormsUiPchProviderComponent, 
        WebPchProviderSelectTableViewComponent, 
        WebPchProviderSelectComponent,
        WebPchProviderGridComponent
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
          name: 'pch-provider-select',
          component: WebPchProviderSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'pch-provider-grid',
          component: WebPchProviderGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPchProviderFeatureStore],
})
export class WebFormsUiPchProviderSelectModule {}
