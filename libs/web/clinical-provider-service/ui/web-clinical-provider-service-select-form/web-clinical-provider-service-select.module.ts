

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClinicalProviderServiceFeatureStore } from '@case-clinical/web/clinical-provider-service/shared'
import { WebClinicalProviderServiceSelectComponent } from './web-clinical-provider-service-select.component'
import { WebClinicalProviderServiceSelectTableViewComponent } from './web-clinical-provider-service-select-table-view.component'
import { WebFormsUiClinicalProviderServiceComponent } from './web-clinical-provider-service-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClinicalProviderServiceGridComponent } from './web-clinical-provider-service-grid.component'

@NgModule({
  exports: [
        WebFormsUiClinicalProviderServiceComponent, 
        WebClinicalProviderServiceSelectTableViewComponent, 
        WebClinicalProviderServiceSelectComponent,
        WebClinicalProviderServiceGridComponent
    ],
  declarations: [
        WebFormsUiClinicalProviderServiceComponent, 
        WebClinicalProviderServiceSelectTableViewComponent, 
        WebClinicalProviderServiceSelectComponent,
        WebClinicalProviderServiceGridComponent
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
          name: 'clinical-provider-service-select',
          component: WebClinicalProviderServiceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'clinical-provider-service-grid',
          component: WebClinicalProviderServiceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClinicalProviderServiceFeatureStore],
})
export class WebFormsUiClinicalProviderServiceSelectModule {}
