
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { AngularSplitModule } from 'angular-split';
import { WebTemplateEditComponent } from './web-template-edit.component'
import { DocumentEditorModule } from '@txtextcontrol/tx-ng-document-editor'

@NgModule({
  declarations: [WebTemplateEditComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    AngularSplitModule,
    WebUiSidebarPageModule,
    RouterModule.forChild([{ path: '', component: WebTemplateEditComponent }]),
    DocumentEditorModule

  ],
})
export class WebTemplateEditModule {}

