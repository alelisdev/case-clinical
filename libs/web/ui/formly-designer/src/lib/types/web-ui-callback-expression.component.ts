import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'

@Component({
  template: `
    <div class="flex-1 flex flex-row mt-1 gap-2" [ngClass]="{'flex-col': to.narrow, 'flex-row': !to.narrow}">
      <select
        [ngClass]="{'w-90': !to.narrow, 'w-full px-0.5': to.narrow}"
        style="height: 42px"
        (change)="keyDidChange($event.target.value)"
      >
        <option *ngFor="let item of to.items" [selected]="item===expressionName" [value]="item">{{ item }}</option>
      </select>
      <ui-code
        [narrow]="to.narrow"
        [ngClass]="{'flex-1': !to.narrow, 'w-full px-0.5': to.narrow}"
        [code]="expressionConent"
        (codeDidChange)="valueDidChange($event)"
      ></ui-code>
    </div>
  `,
})
export class UiCallbackExpressionComponent extends FieldType implements OnInit {
  formControl!: FormControl

  defaultFuncContent: string|string[] = `async (field: FormlyFieldConfig) => {\n\n}`

  expressionName = '';
  expressionConent = '';
  expressionContents = [];

  ngOnInit(): void {
    // this.expressionConent = this.to.defaultContent ?? this.defaultFuncContent;
    if(Array.isArray(this.to.defaultContent)) {
      this.expressionContents = this.to.defaultContent;
    } else {
      this.expressionConent = this.to.defaultContent ?? this.defaultFuncContent;
    }
    if(this.formControl.value) {
      const key = this.formControl.value['key'];
      const value = this.formControl.value['value'];
      this.keyDidChange(key);
      this.valueDidChange(value);
      this.formControl.setValue({key: this.expressionName, value: this.expressionConent})
    } else {
      this.keyDidChange(this.to.items[0]);
    }
  }

  keyDidChange(expressionName) {
    console.log('---------------------');
    this.expressionName = expressionName;
    if(this.expressionContents.length > 0) {
      const dd = ['dd']
      const index = this.to.items.findIndex((el) => el === expressionName);
      this.expressionConent = this.expressionContents[index]
      this.formControl.setValue({key: this.expressionName, value: this.expressionContents[index]})
    } else {
      this.formControl.setValue({key: this.expressionName, value: this.expressionConent})
    }
  }

  valueDidChange(value) {
    this.expressionConent = value;
    this.formControl.setValue({key: this.expressionName, value: this.expressionConent})
  }
}
