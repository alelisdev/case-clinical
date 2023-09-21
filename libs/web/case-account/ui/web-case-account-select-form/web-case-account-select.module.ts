

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import { WebCaseAccountSelectComponent } from './web-case-account-select.component'
import { WebCaseAccountSelectTableViewComponent } from './web-case-account-select-table-view.component'
import { WebFormsUiCaseAccountComponent } from './web-case-account-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCaseAccountGridComponent } from './web-case-account-grid.component'

@NgModule({
  exports: [
        WebFormsUiCaseAccountComponent, 
        WebCaseAccountSelectTableViewComponent, 
        WebCaseAccountSelectComponent,
        WebCaseAccountGridComponent
    ],
  declarations: [
        WebFormsUiCaseAccountComponent, 
        WebCaseAccountSelectTableViewComponent, 
        WebCaseAccountSelectComponent,
        WebCaseAccountGridComponent
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
          name: 'case-account-select',
          component: WebCaseAccountSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-account-grid',
          component: WebCaseAccountGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCaseAccountFeatureStore],
})
export class WebFormsUiCaseAccountSelectModule {}
