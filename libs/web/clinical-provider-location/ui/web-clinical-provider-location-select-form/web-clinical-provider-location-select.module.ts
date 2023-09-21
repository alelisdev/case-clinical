

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebClinicalProviderLocationSelectComponent } from './web-clinical-provider-location-select.component'
import { WebClinicalProviderLocationSelectTableViewComponent } from './web-clinical-provider-location-select-table-view.component'
import { WebFormsUiClinicalProviderLocationComponent } from './web-clinical-provider-location-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClinicalProviderLocationGridComponent } from './web-clinical-provider-location-grid.component'

@NgModule({
  exports: [
        WebFormsUiClinicalProviderLocationComponent, 
        WebClinicalProviderLocationSelectTableViewComponent, 
        WebClinicalProviderLocationSelectComponent,
        WebClinicalProviderLocationGridComponent
    ],
  declarations: [
        WebFormsUiClinicalProviderLocationComponent, 
        WebClinicalProviderLocationSelectTableViewComponent, 
        WebClinicalProviderLocationSelectComponent,
        WebClinicalProviderLocationGridComponent
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
          name: 'clinical-provider-location-select',
          component: WebClinicalProviderLocationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'clinical-provider-location-grid',
          component: WebClinicalProviderLocationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClinicalProviderLocationFeatureStore],
})
export class WebFormsUiClinicalProviderLocationSelectModule {}
