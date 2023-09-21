

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebAppointmentListComponent } from './web-appointment-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { UtilitySharedModule, UiFormsSharedModule } from '@case-clinical/web/shared/ui'

@NgModule({
  declarations: [WebAppointmentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebAppointmentListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
    WebUiFormlyDesignerModule,
    UiFormsSharedModule,
    WebUiFormModule,
  ],
})
export class WebAppointmentListModule {}

