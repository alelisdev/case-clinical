

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared'
import { WebVendorLocationSelectComponent } from './web-vendor-location-select.component'
import { WebVendorLocationSelectTableViewComponent } from './web-vendor-location-select-table-view.component'
import { WebFormsUiVendorLocationComponent } from './web-vendor-location-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebVendorLocationGridComponent } from './web-vendor-location-grid.component'

@NgModule({
  exports: [
        WebFormsUiVendorLocationComponent, 
        WebVendorLocationSelectTableViewComponent, 
        WebVendorLocationSelectComponent,
        WebVendorLocationGridComponent
    ],
  declarations: [
        WebFormsUiVendorLocationComponent, 
        WebVendorLocationSelectTableViewComponent, 
        WebVendorLocationSelectComponent,
        WebVendorLocationGridComponent
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
          name: 'vendor-location-select',
          component: WebVendorLocationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'vendor-location-grid',
          component: WebVendorLocationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebVendorLocationFeatureStore],
})
export class WebFormsUiVendorLocationSelectModule {}
