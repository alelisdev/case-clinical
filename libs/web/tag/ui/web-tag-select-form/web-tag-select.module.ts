

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'
import { WebTagSelectComponent } from './web-tag-select.component'
import { WebTagSelectTableViewComponent } from './web-tag-select-table-view.component'
import { WebFormsUiTagComponent } from './web-tag-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTagGridComponent } from './web-tag-grid.component'

@NgModule({
  exports: [
        WebFormsUiTagComponent, 
        WebTagSelectTableViewComponent, 
        WebTagSelectComponent,
        WebTagGridComponent
    ],
  declarations: [
        WebFormsUiTagComponent, 
        WebTagSelectTableViewComponent, 
        WebTagSelectComponent,
        WebTagGridComponent
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
          name: 'tag-select',
          component: WebTagSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'tag-grid',
          component: WebTagGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTagFeatureStore],
})
export class WebFormsUiTagSelectModule {}
