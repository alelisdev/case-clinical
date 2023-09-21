

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebSurgicalPositionFeatureStore } from '@case-clinical/web/surgical-position/shared'
import { WebSurgicalPositionSelectComponent } from './web-surgical-position-select.component'
import { WebSurgicalPositionSelectTableViewComponent } from './web-surgical-position-select-table-view.component'
import { WebFormsUiSurgicalPositionComponent } from './web-surgical-position-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebSurgicalPositionGridComponent } from './web-surgical-position-grid.component'

@NgModule({
  exports: [
        WebFormsUiSurgicalPositionComponent, 
        WebSurgicalPositionSelectTableViewComponent, 
        WebSurgicalPositionSelectComponent,
        WebSurgicalPositionGridComponent
    ],
  declarations: [
        WebFormsUiSurgicalPositionComponent, 
        WebSurgicalPositionSelectTableViewComponent, 
        WebSurgicalPositionSelectComponent,
        WebSurgicalPositionGridComponent
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
          name: 'surgical-position-select',
          component: WebSurgicalPositionSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'surgical-position-grid',
          component: WebSurgicalPositionGridComponent,
        }
      ],
    }),
  ],
  providers: [WebSurgicalPositionFeatureStore],
})
export class WebFormsUiSurgicalPositionSelectModule {}
