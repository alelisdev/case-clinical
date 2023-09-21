

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTemplateSelectFormStore } from './web-template-select-form.store'
import { WebTemplateSelectComponent } from './web-template-select.component'
import { WebTemplateSelectTableViewComponent } from './web-template-select-table-view.component'
import { WebFormsUitemplateComponent } from './web-template-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebTemplateFeatureStore } from '../../shared'
@NgModule({
  exports: [ WebTemplateSelectTableViewComponent, WebTemplateSelectTableViewComponent, WebTemplateSelectComponent, WebFormsUitemplateComponent],
  declarations: [ WebTemplateSelectTableViewComponent, WebTemplateSelectTableViewComponent, WebTemplateSelectComponent, WebFormsUitemplateComponent],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'template-select',
          component: WebTemplateSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
  providers: [WebTemplateSelectFormStore, WebTemplateFeatureStore],
})
export class WebFormsUiTemplateSelectModule {}
