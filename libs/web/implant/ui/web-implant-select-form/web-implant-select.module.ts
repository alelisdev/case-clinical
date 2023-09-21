

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebImplantFeatureStore } from '@case-clinical/web/implant/shared'
import { WebImplantSelectComponent } from './web-implant-select.component'
import { WebImplantSelectTableViewComponent } from './web-implant-select-table-view.component'
import { WebFormsUiImplantComponent } from './web-implant-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebImplantGridComponent } from './web-implant-grid.component'

@NgModule({
  exports: [
        WebFormsUiImplantComponent, 
        WebImplantSelectTableViewComponent, 
        WebImplantSelectComponent,
        WebImplantGridComponent
    ],
  declarations: [
        WebFormsUiImplantComponent, 
        WebImplantSelectTableViewComponent, 
        WebImplantSelectComponent,
        WebImplantGridComponent
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
          name: 'implant-select',
          component: WebImplantSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'implant-grid',
          component: WebImplantGridComponent,
        }
      ],
    }),
  ],
  providers: [WebImplantFeatureStore],
})
export class WebFormsUiImplantSelectModule {}
