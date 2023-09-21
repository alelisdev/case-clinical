import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from './markdown.component';
import { FormlyModule } from '@ngx-formly/core'
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

@NgModule({
  declarations: [
    MarkdownComponent
  ],
  imports: [
    CommonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'markdown',
          component: MarkdownComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          renderer: new MarkedRenderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    FormsModule,
    AngularMarkdownEditorModule.forRoot({
      // add any Global Options/Config you might want
      // to avoid passing the same options over and over in each components of your App
      iconlibrary: 'glyph'
    })
  ]
})
export class UiFormMarkdownModule { }
