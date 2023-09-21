

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebFormsUiUserFeatureComponent } from './web-user-feature-ui-form.component'
import { WebUserFeatureTableViewComponent } from './web-user-feature-table-view.component'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { FormlyModule } from '@ngx-formly/core'
import { UserFeatureSelectComponent } from './user-feature-select/user-feature-select.component'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from 'libs/web/ui/form/src/lib/wrappers/form-field/ui-form-field.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  exports: [WebFormsUiUserFeatureComponent, WebUserFeatureTableViewComponent, UserFeatureSelectComponent],
  declarations: [WebFormsUiUserFeatureComponent, WebUserFeatureTableViewComponent, UserFeatureSelectComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    WebUiFormModule,
    WebUiButtonModule, 
    WebUiPageHeaderModule,
    WebUiPageModule, 
    WebUiPanelModule, 
    WebCoreFeatureModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'user-feature-select',
          component: UserFeatureSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ]
})
export class WebFormsUiUserFeatureModule {}
