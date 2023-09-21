

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRequestAdditionalVisitFeatureStore } from '@case-clinical/web/request-additional-visit/shared'
import { WebRequestAdditionalVisitSelectComponent } from './web-request-additional-visit-select.component'
import { WebRequestAdditionalVisitSelectTableViewComponent } from './web-request-additional-visit-select-table-view.component'
import { WebFormsUiRequestAdditionalVisitComponent } from './web-request-additional-visit-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRequestAdditionalVisitGridComponent } from './web-request-additional-visit-grid.component'

@NgModule({
  exports: [
        WebFormsUiRequestAdditionalVisitComponent, 
        WebRequestAdditionalVisitSelectTableViewComponent, 
        WebRequestAdditionalVisitSelectComponent,
        WebRequestAdditionalVisitGridComponent
    ],
  declarations: [
        WebFormsUiRequestAdditionalVisitComponent, 
        WebRequestAdditionalVisitSelectTableViewComponent, 
        WebRequestAdditionalVisitSelectComponent,
        WebRequestAdditionalVisitGridComponent
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
          name: 'request-additional-visit-select',
          component: WebRequestAdditionalVisitSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'request-additional-visit-grid',
          component: WebRequestAdditionalVisitGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRequestAdditionalVisitFeatureStore],
})
export class WebFormsUiRequestAdditionalVisitSelectModule {}
