

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'
import { WebVisitKindSelectComponent } from './web-visit-kind-select.component'
import { WebVisitKindSelectTableViewComponent } from './web-visit-kind-select-table-view.component'
import { WebFormsUiVisitKindComponent } from './web-visit-kind-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebVisitKindGridComponent } from './web-visit-kind-grid.component'

@NgModule({
  exports: [
        WebFormsUiVisitKindComponent, 
        WebVisitKindSelectTableViewComponent, 
        WebVisitKindSelectComponent,
        WebVisitKindGridComponent
    ],
  declarations: [
        WebFormsUiVisitKindComponent, 
        WebVisitKindSelectTableViewComponent, 
        WebVisitKindSelectComponent,
        WebVisitKindGridComponent
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
          name: 'visit-kind-select',
          component: WebVisitKindSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'visit-kind-grid',
          component: WebVisitKindGridComponent,
        }
      ],
    }),
  ],
  providers: [WebVisitKindFeatureStore],
})
export class WebFormsUiVisitKindSelectModule {}
