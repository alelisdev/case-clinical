

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebLocationSelectComponent } from './web-location-select.component'
import { WebLocationSelectTableViewComponent } from './web-location-select-table-view.component'
import { WebFormsUiLocationComponent } from './web-location-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLocationGridComponent } from './web-location-grid.component'

@NgModule({
  exports: [
        WebFormsUiLocationComponent,
        WebLocationSelectTableViewComponent,
        WebLocationSelectComponent,
        WebLocationGridComponent
    ],
  declarations: [
        WebFormsUiLocationComponent,
        WebLocationSelectTableViewComponent,
        WebLocationSelectComponent,
        WebLocationGridComponent
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
          name: 'location-select',
          component: WebLocationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'location-grid',
          component: WebLocationGridComponent,
        }
      ],
    }),
  ],
})
export class WebFormsUiLocationSelectModule {}
