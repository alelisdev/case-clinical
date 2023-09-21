import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <div class="w-full mb-5">
      <div [ngClass]="TitleClass">{{ to.title }}</div>
      <div [ngClass]="SubTitleClass">{{ to.subtitle }}</div>
    </div>
  `,
})
export class UiFormHeadingComponent extends FieldType {
  formControl!: FormControl

  public get TitleClass() : string {
    return ( this.to.titleStyle && this.to.titleStyle.length > 0 ) ? this.to.titleStyle : 'text-xl text-gray-900 dark:text-gray-50'
  }

  public get SubTitleClass() : string {
    return (this.to.subTitleStyle && this.to.subTitleStyle.length > 0) ? this.to.subTitleStyle : 'text-secondary'
  }
}
