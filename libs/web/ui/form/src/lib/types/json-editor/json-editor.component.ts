import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';

@Component({
  selector: 'ui-json-editor',
  template:  `
    <json-editor
      [options]="editorOptions"
      [data]="initialData"
      (change)="showJson($event)"
    ></json-editor>
  `,
  styleUrls: ['./json-editor.component.scss']
})
export class UiJsonEditorComponent extends FieldType implements OnInit {
  formControl!: FormControl;
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;

  constructor() {
    super()

    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
  }

  ngOnInit(): void {
     if(this.formControl.value) {
      this.initialData = this.formControl.value;
      this.visibleData = this.formControl.value;
     } else {
      console.log('in the empty',this.formControl)
     }
  }

  showJson(d: Event) {
    if(!(d instanceof Event)) {
      this.visibleData = d;
      console.log('inside the json editor', this.visibleData)
      this.formControl.setValue(this.visibleData);
    }
  }
}
