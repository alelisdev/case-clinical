

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebBodyPartLeadFeatureStore } from '@case-clinical/web/body-part-lead/shared'
import { WebBodyPartLeadSelectComponent } from './web-body-part-lead-select.component'
import { WebBodyPartLeadSelectTableViewComponent } from './web-body-part-lead-select-table-view.component'
import { WebFormsUiBodyPartLeadComponent } from './web-body-part-lead-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebBodyPartLeadGridComponent } from './web-body-part-lead-grid.component'

@NgModule({
  exports: [
        WebFormsUiBodyPartLeadComponent, 
        WebBodyPartLeadSelectTableViewComponent, 
        WebBodyPartLeadSelectComponent,
        WebBodyPartLeadGridComponent
    ],
  declarations: [
        WebFormsUiBodyPartLeadComponent, 
        WebBodyPartLeadSelectTableViewComponent, 
        WebBodyPartLeadSelectComponent,
        WebBodyPartLeadGridComponent
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
          name: 'body-part-lead-select',
          component: WebBodyPartLeadSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'body-part-lead-grid',
          component: WebBodyPartLeadGridComponent,
        }
      ],
    }),
  ],
  providers: [WebBodyPartLeadFeatureStore],
})
export class WebFormsUiBodyPartLeadSelectModule {}
