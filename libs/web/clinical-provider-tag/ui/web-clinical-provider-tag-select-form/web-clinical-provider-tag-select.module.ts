

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebClinicalProviderTagFeatureStore } from '@case-clinical/web/clinical-provider-tag/shared'
import { WebClinicalProviderTagSelectComponent } from './web-clinical-provider-tag-select.component'
import { WebClinicalProviderTagSelectTableViewComponent } from './web-clinical-provider-tag-select-table-view.component'
import { WebFormsUiClinicalProviderTagComponent } from './web-clinical-provider-tag-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebClinicalProviderTagGridComponent } from './web-clinical-provider-tag-grid.component'

@NgModule({
  exports: [
        WebFormsUiClinicalProviderTagComponent, 
        WebClinicalProviderTagSelectTableViewComponent, 
        WebClinicalProviderTagSelectComponent,
        WebClinicalProviderTagGridComponent
    ],
  declarations: [
        WebFormsUiClinicalProviderTagComponent, 
        WebClinicalProviderTagSelectTableViewComponent, 
        WebClinicalProviderTagSelectComponent,
        WebClinicalProviderTagGridComponent
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
          name: 'clinical-provider-tag-select',
          component: WebClinicalProviderTagSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'clinical-provider-tag-grid',
          component: WebClinicalProviderTagGridComponent,
        }
      ],
    }),
  ],
  providers: [WebClinicalProviderTagFeatureStore],
})
export class WebFormsUiClinicalProviderTagSelectModule {}
