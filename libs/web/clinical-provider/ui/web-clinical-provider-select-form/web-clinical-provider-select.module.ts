

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebClinicalProviderSelectComponent } from './web-clinical-provider-select.component'
import { WebClinicalProviderSelectTableViewComponent } from './web-clinical-provider-select-table-view.component'
import { WebFormsUiClinicalProviderComponent } from './web-clinical-provider-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClinicalProviderGridComponent } from './web-clinical-provider-grid.component'

@NgModule({
  exports: [
        WebFormsUiClinicalProviderComponent, 
        WebClinicalProviderSelectTableViewComponent, 
        WebClinicalProviderSelectComponent,
        WebClinicalProviderGridComponent
    ],
  declarations: [
        WebFormsUiClinicalProviderComponent, 
        WebClinicalProviderSelectTableViewComponent, 
        WebClinicalProviderSelectComponent,
        WebClinicalProviderGridComponent
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
          name: 'clinical-provider-select',
          component: WebClinicalProviderSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'clinical-provider-grid',
          component: WebClinicalProviderGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClinicalProviderFeatureStore],
})
export class WebFormsUiClinicalProviderSelectModule {}
