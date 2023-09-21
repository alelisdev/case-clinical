

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebReconciliationPeriodTypeFeatureStore } from '@case-clinical/web/reconciliation-period-type/shared'
import { WebReconciliationPeriodTypeSelectComponent } from './web-reconciliation-period-type-select.component'
import { WebReconciliationPeriodTypeSelectTableViewComponent } from './web-reconciliation-period-type-select-table-view.component'
import { WebFormsUiReconciliationPeriodTypeComponent } from './web-reconciliation-period-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebReconciliationPeriodTypeGridComponent } from './web-reconciliation-period-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiReconciliationPeriodTypeComponent, 
        WebReconciliationPeriodTypeSelectTableViewComponent, 
        WebReconciliationPeriodTypeSelectComponent,
        WebReconciliationPeriodTypeGridComponent
    ],
  declarations: [
        WebFormsUiReconciliationPeriodTypeComponent, 
        WebReconciliationPeriodTypeSelectTableViewComponent, 
        WebReconciliationPeriodTypeSelectComponent,
        WebReconciliationPeriodTypeGridComponent
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
          name: 'reconciliation-period-type-select',
          component: WebReconciliationPeriodTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'reconciliation-period-type-grid',
          component: WebReconciliationPeriodTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebReconciliationPeriodTypeFeatureStore],
})
export class WebFormsUiReconciliationPeriodTypeSelectModule {}
