

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAuthorizationTypeFeatureStore } from '@case-clinical/web/authorization-type/shared'
import { WebAuthorizationTypeSelectComponent } from './web-authorization-type-select.component'
import { WebAuthorizationTypeSelectTableViewComponent } from './web-authorization-type-select-table-view.component'
import { WebFormsUiAuthorizationTypeComponent } from './web-authorization-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAuthorizationTypeGridComponent } from './web-authorization-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiAuthorizationTypeComponent, 
        WebAuthorizationTypeSelectTableViewComponent, 
        WebAuthorizationTypeSelectComponent,
        WebAuthorizationTypeGridComponent
    ],
  declarations: [
        WebFormsUiAuthorizationTypeComponent, 
        WebAuthorizationTypeSelectTableViewComponent, 
        WebAuthorizationTypeSelectComponent,
        WebAuthorizationTypeGridComponent
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
          name: 'authorization-type-select',
          component: WebAuthorizationTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'authorization-type-grid',
          component: WebAuthorizationTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAuthorizationTypeFeatureStore],
})
export class WebFormsUiAuthorizationTypeSelectModule {}
