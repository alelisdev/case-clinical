import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { CodeEditorComponent } from './code-editor/code-editor.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiCodeComponent } from './web-ui-code.component'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NumberedCodeblockModule } from '@ctrl/ngx-numbered-codeblock'
@NgModule({
  declarations: [WebUiCodeComponent, CodeEditorComponent],
  imports: [
    ClipboardModule,
    CommonModule,
    FormsModule,
    RouterModule,
    WebUiIconModule,
    MonacoEditorModule.forRoot(),
    NumberedCodeblockModule,
  ],
  exports: [WebUiCodeComponent, CodeEditorComponent],
})
export class WebUiCodeModule {}
