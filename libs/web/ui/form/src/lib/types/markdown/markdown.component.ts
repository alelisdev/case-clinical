import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { EditorOption } from 'angular-markdown-editor'
import { MarkdownService } from 'ngx-markdown'
import { EditorInstance } from 'angular-markdown-editor'
import * as $ from 'jquery';

@Component({
  selector: 'ui-markdown',
  styleUrls: ['./markdown.component.css'],
  templateUrl: './markdown.component.html',
})
export class MarkdownComponent extends FieldType implements OnInit {
  formControl!: FormControl
  editorOptions: EditorOption;
  bsEditorInstance: EditorInstance;

  markdownText: string

  constructor(private markdownService: MarkdownService) {
    super()
  }

  ngOnInit(): void {
    this.editorOptions  = {
      onChange: (e) => this.formControl.setValue(e.getContent()),
      onFullscreenExit: () => this.offFullscreen(),
      onFullscreen: () => this.onFullscreen(),
      height: 500,
      parser: (val) => this.parse(val),
      onShow: (e) => this.bsEditorInstance = e,
      onPreview: (e) => { this.onPreview() }
    };

    this.markdownText = this.to.value;

    $(document).on('DOMNodeInserted', function(e) {
      if ( $(e.target).hasClass('md-preview') ) {
        console.log('md-preview has been added')
        $(e.target).css('max-height', $(e.target).css('min-height'))
      }
  });
  }

  onPreview() {
    console.log('onPreview')
  }

  offFullscreen() {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  onFullscreen() {
    console.log('onFullscreen')
    $('.md-preview').css('max-height', 'none')
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim())
    this.highlight()
    return markedOutput;
  }
}
