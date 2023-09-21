

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRecommendedOrderDiagnosisCodeFeatureStore } from '@case-clinical/web/recommended-order-diagnosis-code/shared'
import { WebRecommendedOrderDiagnosisCodeSelectComponent } from './web-recommended-order-diagnosis-code-select.component'
import { WebRecommendedOrderDiagnosisCodeSelectTableViewComponent } from './web-recommended-order-diagnosis-code-select-table-view.component'
import { WebFormsUiRecommendedOrderDiagnosisCodeComponent } from './web-recommended-order-diagnosis-code-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRecommendedOrderDiagnosisCodeGridComponent } from './web-recommended-order-diagnosis-code-grid.component'

@NgModule({
  exports: [
        WebFormsUiRecommendedOrderDiagnosisCodeComponent, 
        WebRecommendedOrderDiagnosisCodeSelectTableViewComponent, 
        WebRecommendedOrderDiagnosisCodeSelectComponent,
        WebRecommendedOrderDiagnosisCodeGridComponent
    ],
  declarations: [
        WebFormsUiRecommendedOrderDiagnosisCodeComponent, 
        WebRecommendedOrderDiagnosisCodeSelectTableViewComponent, 
        WebRecommendedOrderDiagnosisCodeSelectComponent,
        WebRecommendedOrderDiagnosisCodeGridComponent
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
          name: 'recommended-order-diagnosis-code-select',
          component: WebRecommendedOrderDiagnosisCodeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'recommended-order-diagnosis-code-grid',
          component: WebRecommendedOrderDiagnosisCodeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRecommendedOrderDiagnosisCodeFeatureStore],
})
export class WebFormsUiRecommendedOrderDiagnosisCodeSelectModule {}
