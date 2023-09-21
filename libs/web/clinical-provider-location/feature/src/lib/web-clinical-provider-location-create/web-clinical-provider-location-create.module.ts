
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { UtilitySharedModule, UiFormsSharedModule } from '@case-clinical/web/shared/ui'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { TranslocoModule } from '@ngneat/transloco'
import { WebClinicalProviderLocationCreateComponent } from './web-clinical-provider-location-create.component'

@NgModule({
  declarations: [WebClinicalProviderLocationCreateComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiFormModule,
    WebUiPageHeaderModule,
    UtilitySharedModule,
    UiFormsSharedModule,
    WebUiFormlyDesignerModule,
    TranslocoModule,
    RouterModule.forChild([{ path: '', component: WebClinicalProviderLocationCreateComponent }]),
  ],
})
export class WebClinicalProviderLocationCreateModule {}
