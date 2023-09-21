

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebRoleFeaturePermissionListComponent } from './web-role-feature-permission-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebRoleFeaturePermissionListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebRoleFeaturePermissionListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebRoleFeaturePermissionListModule {}

