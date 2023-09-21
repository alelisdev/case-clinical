

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRecommendedOrderAuthorizationFeatureStore } from '@case-clinical/web/recommended-order-authorization/shared'
import { WebRecommendedOrderAuthorizationSelectComponent } from './web-recommended-order-authorization-select.component'
import { WebRecommendedOrderAuthorizationSelectTableViewComponent } from './web-recommended-order-authorization-select-table-view.component'
import { WebFormsUiRecommendedOrderAuthorizationComponent } from './web-recommended-order-authorization-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRecommendedOrderAuthorizationGridComponent } from './web-recommended-order-authorization-grid.component'

@NgModule({
  exports: [
        WebFormsUiRecommendedOrderAuthorizationComponent, 
        WebRecommendedOrderAuthorizationSelectTableViewComponent, 
        WebRecommendedOrderAuthorizationSelectComponent,
        WebRecommendedOrderAuthorizationGridComponent
    ],
  declarations: [
        WebFormsUiRecommendedOrderAuthorizationComponent, 
        WebRecommendedOrderAuthorizationSelectTableViewComponent, 
        WebRecommendedOrderAuthorizationSelectComponent,
        WebRecommendedOrderAuthorizationGridComponent
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
          name: 'recommended-order-authorization-select',
          component: WebRecommendedOrderAuthorizationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'recommended-order-authorization-grid',
          component: WebRecommendedOrderAuthorizationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRecommendedOrderAuthorizationFeatureStore],
})
export class WebFormsUiRecommendedOrderAuthorizationSelectModule {}
