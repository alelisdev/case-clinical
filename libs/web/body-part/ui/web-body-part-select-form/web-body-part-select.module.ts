

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebBodyPartFeatureStore } from '@case-clinical/web/body-part/shared'
import { WebBodyPartSelectComponent } from './web-body-part-select.component'
import { WebBodyPartSelectTableViewComponent } from './web-body-part-select-table-view.component'
import { WebFormsUiBodyPartComponent } from './web-body-part-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebBodyPartGridComponent } from './web-body-part-grid.component'

@NgModule({
  exports: [
        WebFormsUiBodyPartComponent, 
        WebBodyPartSelectTableViewComponent, 
        WebBodyPartSelectComponent,
        WebBodyPartGridComponent
    ],
  declarations: [
        WebFormsUiBodyPartComponent, 
        WebBodyPartSelectTableViewComponent, 
        WebBodyPartSelectComponent,
        WebBodyPartGridComponent
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
          name: 'body-part-select',
          component: WebBodyPartSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'body-part-grid',
          component: WebBodyPartGridComponent,
        }
      ],
    }),
  ],
  providers: [WebBodyPartFeatureStore],
})
export class WebFormsUiBodyPartSelectModule {}
