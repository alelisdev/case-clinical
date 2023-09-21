

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthGuidelineFeatureStore } from '@case-clinical/web/prior-auth-guideline/shared'
import { WebPriorAuthGuidelineSelectComponent } from './web-prior-auth-guideline-select.component'
import { WebPriorAuthGuidelineSelectTableViewComponent } from './web-prior-auth-guideline-select-table-view.component'
import { WebFormsUiPriorAuthGuidelineComponent } from './web-prior-auth-guideline-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthGuidelineGridComponent } from './web-prior-auth-guideline-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthGuidelineComponent, 
        WebPriorAuthGuidelineSelectTableViewComponent, 
        WebPriorAuthGuidelineSelectComponent,
        WebPriorAuthGuidelineGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthGuidelineComponent, 
        WebPriorAuthGuidelineSelectTableViewComponent, 
        WebPriorAuthGuidelineSelectComponent,
        WebPriorAuthGuidelineGridComponent
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
          name: 'prior-auth-guideline-select',
          component: WebPriorAuthGuidelineSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-auth-guideline-grid',
          component: WebPriorAuthGuidelineGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthGuidelineFeatureStore],
})
export class WebFormsUiPriorAuthGuidelineSelectModule {}
