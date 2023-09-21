

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared'
import { WebReviewSelectComponent } from './web-review-select.component'
import { WebReviewSelectTableViewComponent } from './web-review-select-table-view.component'
import { WebFormsUiReviewComponent } from './web-review-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebReviewGridComponent } from './web-review-grid.component'

@NgModule({
  exports: [
        WebFormsUiReviewComponent, 
        WebReviewSelectTableViewComponent, 
        WebReviewSelectComponent,
        WebReviewGridComponent
    ],
  declarations: [
        WebFormsUiReviewComponent, 
        WebReviewSelectTableViewComponent, 
        WebReviewSelectComponent,
        WebReviewGridComponent
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
          name: 'review-select',
          component: WebReviewSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'review-grid',
          component: WebReviewGridComponent,
        }
      ],
    }),
  ],
  providers: [WebReviewFeatureStore],
})
export class WebFormsUiReviewSelectModule {}
