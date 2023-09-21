

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureSiteFeatureStore } from '@case-clinical/web/procedure-site/shared'
import { WebProcedureSiteSelectComponent } from './web-procedure-site-select.component'
import { WebProcedureSiteSelectTableViewComponent } from './web-procedure-site-select-table-view.component'
import { WebFormsUiProcedureSiteComponent } from './web-procedure-site-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureSiteGridComponent } from './web-procedure-site-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureSiteComponent, 
        WebProcedureSiteSelectTableViewComponent, 
        WebProcedureSiteSelectComponent,
        WebProcedureSiteGridComponent
    ],
  declarations: [
        WebFormsUiProcedureSiteComponent, 
        WebProcedureSiteSelectTableViewComponent, 
        WebProcedureSiteSelectComponent,
        WebProcedureSiteGridComponent
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
          name: 'procedure-site-select',
          component: WebProcedureSiteSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-site-grid',
          component: WebProcedureSiteGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureSiteFeatureStore],
})
export class WebFormsUiProcedureSiteSelectModule {}
