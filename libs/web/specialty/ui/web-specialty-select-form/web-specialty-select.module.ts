

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { WebSpecialtySelectComponent } from './web-specialty-select.component'
import { WebSpecialtySelectTableViewComponent } from './web-specialty-select-table-view.component'
import { WebFormsUiSpecialtyComponent } from './web-specialty-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebSpecialtyGridComponent } from './web-specialty-grid.component'

@NgModule({
  exports: [
        WebFormsUiSpecialtyComponent, 
        WebSpecialtySelectTableViewComponent, 
        WebSpecialtySelectComponent,
        WebSpecialtyGridComponent
    ],
  declarations: [
        WebFormsUiSpecialtyComponent, 
        WebSpecialtySelectTableViewComponent, 
        WebSpecialtySelectComponent,
        WebSpecialtyGridComponent
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
          name: 'specialty-select',
          component: WebSpecialtySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'specialty-grid',
          component: WebSpecialtyGridComponent,
        }
      ],
    }),
  ],
  providers: [WebSpecialtyFeatureStore],
})
export class WebFormsUiSpecialtySelectModule {}
