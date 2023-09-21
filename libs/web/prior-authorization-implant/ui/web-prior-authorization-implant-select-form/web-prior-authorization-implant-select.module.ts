

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthorizationImplantFeatureStore } from '@case-clinical/web/prior-authorization-implant/shared'
import { WebPriorAuthorizationImplantSelectComponent } from './web-prior-authorization-implant-select.component'
import { WebPriorAuthorizationImplantSelectTableViewComponent } from './web-prior-authorization-implant-select-table-view.component'
import { WebFormsUiPriorAuthorizationImplantComponent } from './web-prior-authorization-implant-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthorizationImplantGridComponent } from './web-prior-authorization-implant-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthorizationImplantComponent, 
        WebPriorAuthorizationImplantSelectTableViewComponent, 
        WebPriorAuthorizationImplantSelectComponent,
        WebPriorAuthorizationImplantGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthorizationImplantComponent, 
        WebPriorAuthorizationImplantSelectTableViewComponent, 
        WebPriorAuthorizationImplantSelectComponent,
        WebPriorAuthorizationImplantGridComponent
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
          name: 'prior-authorization-implant-select',
          component: WebPriorAuthorizationImplantSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-authorization-implant-grid',
          component: WebPriorAuthorizationImplantGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthorizationImplantFeatureStore],
})
export class WebFormsUiPriorAuthorizationImplantSelectModule {}
