

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAgreementTypeFeatureStore } from '@case-clinical/web/agreement-type/shared'
import { WebAgreementTypeSelectComponent } from './web-agreement-type-select.component'
import { WebAgreementTypeSelectTableViewComponent } from './web-agreement-type-select-table-view.component'
import { WebFormsUiAgreementTypeComponent } from './web-agreement-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAgreementTypeGridComponent } from './web-agreement-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiAgreementTypeComponent, 
        WebAgreementTypeSelectTableViewComponent, 
        WebAgreementTypeSelectComponent,
        WebAgreementTypeGridComponent
    ],
  declarations: [
        WebFormsUiAgreementTypeComponent, 
        WebAgreementTypeSelectTableViewComponent, 
        WebAgreementTypeSelectComponent,
        WebAgreementTypeGridComponent
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
          name: 'agreement-type-select',
          component: WebAgreementTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'agreement-type-grid',
          component: WebAgreementTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAgreementTypeFeatureStore],
})
export class WebFormsUiAgreementTypeSelectModule {}
