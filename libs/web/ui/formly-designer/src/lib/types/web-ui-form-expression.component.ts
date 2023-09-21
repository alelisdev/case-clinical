import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { validationItems } from './validation-items';

@Component({
  styleUrls: ['./web-ui-form-validation.component.scss'],
  template: `
    <div class="flex-1 flex flex-row mt-1 gap-2" [ngClass]="{'flex-col': to.narrow, 'flex-row': !to.narrow}">
      <ui-code
        class="min-h-8"
        [ngClass]="{'w-90': !to.narrow, 'w-full px-0.5': to.narrow}"
        [code]="expressionName"
        [narrow]="to.narrow"
        (codeDidChange)="keyDidChange($event)"
      ></ui-code>
      <ui-code
      [ngClass]="{'flex-1': !to.narrow, 'w-full px-0.5': to.narrow}"
        [narrow]="to.narrow"
        [code]="expressionConent"
        (codeDidChange)="valueDidChange($event)"
      ></ui-code>
    </div>
  `,
})
export class UiExpressionComponent extends FieldType implements OnInit {
  formControl!: FormControl

  expressionName = 'templateOptions.readOnly';
  expressionConent = '(model: any, formState: any, field: FormlyFieldConfig) => {\n\treturn false\n}';

  ngOnInit(): void {
    if(this.formControl.value) {
      const key = this.formControl.value['key'];
      const value = this.formControl.value['value'];
      this.keyDidChange(key);
      this.valueDidChange(value);
      this.formControl.setValue({key: this.expressionName, value: this.expressionConent})
    }else{
      this.keyDidChange("templateOptions.readOnly");
    }
  }

  keyDidChange(expressionName) {
    this.expressionName = expressionName;
    this.formControl.setValue({key: this.expressionName, value: this.expressionConent})
  }

  valueDidChange(value) {
    this.expressionConent = value;
    this.formControl.setValue({key: this.expressionName, value: this.expressionConent})
  }
}
