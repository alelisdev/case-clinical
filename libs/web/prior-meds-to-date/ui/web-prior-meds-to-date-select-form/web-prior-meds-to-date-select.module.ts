

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorMedsToDateFeatureStore } from '@case-clinical/web/prior-meds-to-date/shared'
import { WebPriorMedsToDateSelectComponent } from './web-prior-meds-to-date-select.component'
import { WebPriorMedsToDateSelectTableViewComponent } from './web-prior-meds-to-date-select-table-view.component'
import { WebFormsUiPriorMedsToDateComponent } from './web-prior-meds-to-date-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorMedsToDateGridComponent } from './web-prior-meds-to-date-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorMedsToDateComponent, 
        WebPriorMedsToDateSelectTableViewComponent, 
        WebPriorMedsToDateSelectComponent,
        WebPriorMedsToDateGridComponent
    ],
  declarations: [
        WebFormsUiPriorMedsToDateComponent, 
        WebPriorMedsToDateSelectTableViewComponent, 
        WebPriorMedsToDateSelectComponent,
        WebPriorMedsToDateGridComponent
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
          name: 'prior-meds-to-date-select',
          component: WebPriorMedsToDateSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-meds-to-date-grid',
          component: WebPriorMedsToDateGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorMedsToDateFeatureStore],
})
export class WebFormsUiPriorMedsToDateSelectModule {}
