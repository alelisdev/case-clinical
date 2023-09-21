

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebCaseAccountListComponent } from './web-case-account-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { UiFormsSharedModule } from '@case-clinical/web/shared/ui'
@NgModule({
  declarations: [WebCaseAccountListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebCaseAccountListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
    WebUiFormlyDesignerModule,
    UiFormsSharedModule
  ],
})
export class WebCaseAccountListModule {}

