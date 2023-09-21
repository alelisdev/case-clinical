import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormPreviewComponent } from './json-form-preview.component';
import { RouterModule } from '@angular/router';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { UiFormConextProviderModule } from 'libs/web/ui/form/src/lib/context-provider/ui-form-context-provider.module';
import { UtilitySharedModule, UiFormsSharedModule } from '@case-clinical/web/shared/ui'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'

@NgModule({
  imports: [
    CommonModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    DocumentViewerModule,
    FormlyModule,
    UiFormConextProviderModule,
    UiFormsSharedModule,
    RouterModule.forChild([{ path: '', component: JsonFormPreviewComponent }]),
  ],
  declarations: [JsonFormPreviewComponent]
})
export class JsonFormPreviewModule { }
