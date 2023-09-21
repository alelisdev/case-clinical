import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { AngularSplitModule } from 'angular-split';
import { WebTemplateCreateComponent } from './web-template-create.component'
import { DocumentEditorModule } from '@txtextcontrol/tx-ng-ds-document-editor'

@NgModule({
  declarations: [WebTemplateCreateComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiFormModule,
    AngularSplitModule,
    WebUiPageHeaderModule,
    RouterModule.forChild([{ path: '', component: WebTemplateCreateComponent }]),
    DocumentEditorModule,
  ],
})
export class WebTemplateCreateModule {}
