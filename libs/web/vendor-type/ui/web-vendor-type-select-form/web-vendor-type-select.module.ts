

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebVendorTypeFeatureStore } from '@case-clinical/web/vendor-type/shared'
import { WebVendorTypeSelectComponent } from './web-vendor-type-select.component'
import { WebVendorTypeSelectTableViewComponent } from './web-vendor-type-select-table-view.component'
import { WebFormsUiVendorTypeComponent } from './web-vendor-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebVendorTypeGridComponent } from './web-vendor-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiVendorTypeComponent, 
        WebVendorTypeSelectTableViewComponent, 
        WebVendorTypeSelectComponent,
        WebVendorTypeGridComponent
    ],
  declarations: [
        WebFormsUiVendorTypeComponent, 
        WebVendorTypeSelectTableViewComponent, 
        WebVendorTypeSelectComponent,
        WebVendorTypeGridComponent
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
          name: 'vendor-type-select',
          component: WebVendorTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'vendor-type-grid',
          component: WebVendorTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebVendorTypeFeatureStore],
})
export class WebFormsUiVendorTypeSelectModule {}
