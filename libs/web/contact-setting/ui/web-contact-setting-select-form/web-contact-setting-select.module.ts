

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContactSettingFeatureStore } from '@case-clinical/web/contact-setting/shared'
import { WebContactSettingSelectComponent } from './web-contact-setting-select.component'
import { WebContactSettingSelectTableViewComponent } from './web-contact-setting-select-table-view.component'
import { WebFormsUiContactSettingComponent } from './web-contact-setting-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContactSettingGridComponent } from './web-contact-setting-grid.component'

@NgModule({
  exports: [
        WebFormsUiContactSettingComponent, 
        WebContactSettingSelectTableViewComponent, 
        WebContactSettingSelectComponent,
        WebContactSettingGridComponent
    ],
  declarations: [
        WebFormsUiContactSettingComponent, 
        WebContactSettingSelectTableViewComponent, 
        WebContactSettingSelectComponent,
        WebContactSettingGridComponent
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
          name: 'contact-setting-select',
          component: WebContactSettingSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contact-setting-grid',
          component: WebContactSettingGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContactSettingFeatureStore],
})
export class WebFormsUiContactSettingSelectModule {}
