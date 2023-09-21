

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared'
import { WebClinicalProviderLocationAvailabilitySelectComponent } from './web-clinical-provider-location-availability-select.component'
import { WebClinicalProviderLocationAvailabilitySelectTableViewComponent } from './web-clinical-provider-location-availability-select-table-view.component'
import { WebFormsUiClinicalProviderLocationAvailabilityComponent } from './web-clinical-provider-location-availability-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClinicalProviderLocationAvailabilityGridComponent } from './web-clinical-provider-location-availability-grid.component'

@NgModule({
  exports: [
        WebFormsUiClinicalProviderLocationAvailabilityComponent, 
        WebClinicalProviderLocationAvailabilitySelectTableViewComponent, 
        WebClinicalProviderLocationAvailabilitySelectComponent,
        WebClinicalProviderLocationAvailabilityGridComponent
    ],
  declarations: [
        WebFormsUiClinicalProviderLocationAvailabilityComponent, 
        WebClinicalProviderLocationAvailabilitySelectTableViewComponent, 
        WebClinicalProviderLocationAvailabilitySelectComponent,
        WebClinicalProviderLocationAvailabilityGridComponent
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
          name: 'clinical-provider-location-availability-select',
          component: WebClinicalProviderLocationAvailabilitySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'clinical-provider-location-availability-grid',
          component: WebClinicalProviderLocationAvailabilityGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClinicalProviderLocationAvailabilityFeatureStore],
})
export class WebFormsUiClinicalProviderLocationAvailabilitySelectModule {}
