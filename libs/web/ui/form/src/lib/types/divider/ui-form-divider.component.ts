import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <div [ngClass]="ClassName"></div>
  `,
})
export class UiFormDividerComponent extends FieldType {
  formControl!: FormControl

  public get ClassName() : string {
    return this.to.borderStyle ? `${this.to.borderStyle} border-t-1` : 'border-t border-primary/50 my-2'
  }

}
