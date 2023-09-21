

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebSettingFeatureStore } from '@case-clinical/web/setting/shared'
import { WebSettingSelectComponent } from './web-setting-select.component'
import { WebSettingSelectTableViewComponent } from './web-setting-select-table-view.component'
import { WebFormsUiSettingComponent } from './web-setting-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebSettingGridComponent } from './web-setting-grid.component'

@NgModule({
  exports: [
        WebFormsUiSettingComponent, 
        WebSettingSelectTableViewComponent, 
        WebSettingSelectComponent,
        WebSettingGridComponent
    ],
  declarations: [
        WebFormsUiSettingComponent, 
        WebSettingSelectTableViewComponent, 
        WebSettingSelectComponent,
        WebSettingGridComponent
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
          name: 'setting-select',
          component: WebSettingSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'setting-grid',
          component: WebSettingGridComponent,
        }
      ],
    }),
  ],
  providers: [WebSettingFeatureStore],
})
export class WebFormsUiSettingSelectModule {}
