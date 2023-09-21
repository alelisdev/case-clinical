
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebVisitKindEditComponent } from './web-visit-kind-edit.component'
import { UtilitySharedModule, UiFormsSharedModule } from '@case-clinical/web/shared/ui'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [WebVisitKindEditComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiSidebarPageModule,
    UtilitySharedModule,
    UiFormsSharedModule,
    WebUiFormlyDesignerModule,
    TranslocoModule,
    RouterModule.forChild([{ path: '', component: WebVisitKindEditComponent }]),

  ],
})
export class WebVisitKindEditModule {}

