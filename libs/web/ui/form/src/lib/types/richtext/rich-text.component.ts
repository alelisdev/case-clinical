import { FormControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import Quill from 'quill';

@Component({
  selector: 'ui-rich-text',
  styleUrls: ['./rich-text.component.scss'],
  template: `
    <quill-editor
      [(ngModel)]="value"
      [styles]="Style"
      [readOnly]="to.readonly"
      scrollingContainer=".ql-editor"
      (onEditorChanged)="onEditorChanged($event)"
      (onEditorCreated)="onEditorCreated($event)"
      (onBlur)="onBlur($event)"
      (onContentChanged)="onContentChanged($event)"
    ></quill-editor>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextComponent extends FieldType implements OnInit {
  formControl!: FormControl
  value = ""
  quillEditor: Quill;

  ngOnInit(): void {
    this.value = this.formControl.value;
  }


  public get Style() : any {
    return {
      height: `${this.to.height ?? 300}px`
    }
  }


  onEditorChanged($event) {
    // console.log($event)
  }

  onContentChanged($event) {
    this.value = $event.html;
    this.formControl.setValue(this.value)
  }

  onBlur($event) {

  }

  onEditorCreated($event) {
    this.quillEditor = $event.editor;
  }
}
