import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiJsonEditorComponent } from './json-editor.component';
import { AngJsoneditorModule } from '@maaxgr/ang-jsoneditor'
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  imports: [
    CommonModule,
    AngJsoneditorModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'json-editor',
          component: UiJsonEditorComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  declarations: [UiJsonEditorComponent]
})
export class UiJsonEditorModule { }
