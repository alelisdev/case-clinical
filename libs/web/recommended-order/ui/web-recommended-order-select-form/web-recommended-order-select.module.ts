

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared'
import { WebRecommendedOrderSelectComponent } from './web-recommended-order-select.component'
import { WebRecommendedOrderSelectTableViewComponent } from './web-recommended-order-select-table-view.component'
import { WebFormsUiRecommendedOrderComponent } from './web-recommended-order-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRecommendedOrderGridComponent } from './web-recommended-order-grid.component'

@NgModule({
  exports: [
        WebFormsUiRecommendedOrderComponent, 
        WebRecommendedOrderSelectTableViewComponent, 
        WebRecommendedOrderSelectComponent,
        WebRecommendedOrderGridComponent
    ],
  declarations: [
        WebFormsUiRecommendedOrderComponent, 
        WebRecommendedOrderSelectTableViewComponent, 
        WebRecommendedOrderSelectComponent,
        WebRecommendedOrderGridComponent
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
          name: 'recommended-order-select',
          component: WebRecommendedOrderSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'recommended-order-grid',
          component: WebRecommendedOrderGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRecommendedOrderFeatureStore],
})
export class WebFormsUiRecommendedOrderSelectModule {}
