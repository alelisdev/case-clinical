

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClinicalProviderSpecialtyFeatureStore } from '@case-clinical/web/clinical-provider-specialty/shared'
import { WebClinicalProviderSpecialtySelectComponent } from './web-clinical-provider-specialty-select.component'
import { WebClinicalProviderSpecialtySelectTableViewComponent } from './web-clinical-provider-specialty-select-table-view.component'
import { WebFormsUiClinicalProviderSpecialtyComponent } from './web-clinical-provider-specialty-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClinicalProviderSpecialtyGridComponent } from './web-clinical-provider-specialty-grid.component'

@NgModule({
  exports: [
        WebFormsUiClinicalProviderSpecialtyComponent, 
        WebClinicalProviderSpecialtySelectTableViewComponent, 
        WebClinicalProviderSpecialtySelectComponent,
        WebClinicalProviderSpecialtyGridComponent
    ],
  declarations: [
        WebFormsUiClinicalProviderSpecialtyComponent, 
        WebClinicalProviderSpecialtySelectTableViewComponent, 
        WebClinicalProviderSpecialtySelectComponent,
        WebClinicalProviderSpecialtyGridComponent
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
          name: 'clinical-provider-specialty-select',
          component: WebClinicalProviderSpecialtySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'clinical-provider-specialty-grid',
          component: WebClinicalProviderSpecialtyGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClinicalProviderSpecialtyFeatureStore],
})
export class WebFormsUiClinicalProviderSpecialtySelectModule {}
