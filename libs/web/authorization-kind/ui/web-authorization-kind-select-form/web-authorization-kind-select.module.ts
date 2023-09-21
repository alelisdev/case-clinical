

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAuthorizationKindFeatureStore } from '@case-clinical/web/authorization-kind/shared'
import { WebAuthorizationKindSelectComponent } from './web-authorization-kind-select.component'
import { WebAuthorizationKindSelectTableViewComponent } from './web-authorization-kind-select-table-view.component'
import { WebFormsUiAuthorizationKindComponent } from './web-authorization-kind-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAuthorizationKindGridComponent } from './web-authorization-kind-grid.component'

@NgModule({
  exports: [
        WebFormsUiAuthorizationKindComponent, 
        WebAuthorizationKindSelectTableViewComponent, 
        WebAuthorizationKindSelectComponent,
        WebAuthorizationKindGridComponent
    ],
  declarations: [
        WebFormsUiAuthorizationKindComponent, 
        WebAuthorizationKindSelectTableViewComponent, 
        WebAuthorizationKindSelectComponent,
        WebAuthorizationKindGridComponent
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
          name: 'authorization-kind-select',
          component: WebAuthorizationKindSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'authorization-kind-grid',
          component: WebAuthorizationKindGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAuthorizationKindFeatureStore],
})
export class WebFormsUiAuthorizationKindSelectModule {}
