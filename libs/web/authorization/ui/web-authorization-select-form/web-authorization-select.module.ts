

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import { WebAuthorizationSelectComponent } from './web-authorization-select.component'
import { WebAuthorizationSelectTableViewComponent } from './web-authorization-select-table-view.component'
import { WebFormsUiAuthorizationComponent } from './web-authorization-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAuthorizationGridComponent } from './web-authorization-grid.component'

@NgModule({
  exports: [
        WebFormsUiAuthorizationComponent, 
        WebAuthorizationSelectTableViewComponent, 
        WebAuthorizationSelectComponent,
        WebAuthorizationGridComponent
    ],
  declarations: [
        WebFormsUiAuthorizationComponent, 
        WebAuthorizationSelectTableViewComponent, 
        WebAuthorizationSelectComponent,
        WebAuthorizationGridComponent
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
          name: 'authorization-select',
          component: WebAuthorizationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'authorization-grid',
          component: WebAuthorizationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAuthorizationFeatureStore],
})
export class WebFormsUiAuthorizationSelectModule {}
