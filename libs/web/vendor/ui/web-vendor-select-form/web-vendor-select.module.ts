

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebVendorSelectComponent } from './web-vendor-select.component'
import { WebVendorSelectTableViewComponent } from './web-vendor-select-table-view.component'
import { WebFormsUiVendorComponent } from './web-vendor-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebVendorGridComponent } from './web-vendor-grid.component'

@NgModule({
  exports: [
        WebFormsUiVendorComponent, 
        WebVendorSelectTableViewComponent, 
        WebVendorSelectComponent,
        WebVendorGridComponent
    ],
  declarations: [
        WebFormsUiVendorComponent, 
        WebVendorSelectTableViewComponent, 
        WebVendorSelectComponent,
        WebVendorGridComponent
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
          name: 'vendor-select',
          component: WebVendorSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'vendor-grid',
          component: WebVendorGridComponent,
        }
      ],
    }),
  ],
  providers: [WebVendorFeatureStore],
})
export class WebFormsUiVendorSelectModule {}
