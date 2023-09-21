import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Entity } from '../Entity';
import { FormlyDesignerService } from '../services/formly-designer.service';

@Component({
  template: `
    <div class='w-full h-full overflow-auto no-scrollbar'>
        <ui-form-field-edit [narrow]="true" [model]="model" (save)="fieldChanged.emit($event)"></ui-form-field-edit>
    </div>
  `,
  selector: 'ui-field-properties',
})
export class FieldPropertiesComponent implements OnInit {
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: Entity = null
  @Output() fieldChanged = new EventEmitter();
  form: any
  constructor(private formlyDesignerService: FormlyDesignerService) { }

  ngOnInit() {
    console.log('ngOnInit:')
    this.form = new FormGroup({})
  }
}
