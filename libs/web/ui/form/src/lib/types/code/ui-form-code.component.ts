import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'

@Component({
  template: `
    <ui-code
      [editOnly]="to.editOnly"
      [narrow]="to.narrow"
      [code]="code"
      (codeDidChange)="codeDidChange($event)"
    ></ui-code>
  `,
})
export class UiFormCodeComponent extends FieldType implements OnInit {
  formControl!: FormControl
  code = ""

  ngOnInit() {
    this.code = this.formControl.value;
    if(!this.code || this.code.length === 0) {
      this.code = this.to.default;
      this.formControl.setValue(this.code);
    }
  }

  codeDidChange($event) {
    this.formControl.setValue($event);
  }
}
