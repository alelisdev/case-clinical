

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthDmeFeatureStore } from '@case-clinical/web/prior-auth-dme/shared'
import { WebPriorAuthDmeSelectComponent } from './web-prior-auth-dme-select.component'
import { WebPriorAuthDmeSelectTableViewComponent } from './web-prior-auth-dme-select-table-view.component'
import { WebFormsUiPriorAuthDmeComponent } from './web-prior-auth-dme-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthDmeGridComponent } from './web-prior-auth-dme-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthDmeComponent, 
        WebPriorAuthDmeSelectTableViewComponent, 
        WebPriorAuthDmeSelectComponent,
        WebPriorAuthDmeGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthDmeComponent, 
        WebPriorAuthDmeSelectTableViewComponent, 
        WebPriorAuthDmeSelectComponent,
        WebPriorAuthDmeGridComponent
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
          name: 'prior-auth-dme-select',
          component: WebPriorAuthDmeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-auth-dme-grid',
          component: WebPriorAuthDmeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthDmeFeatureStore],
})
export class WebFormsUiPriorAuthDmeSelectModule {}
