import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <div [ngClass]="Style">
        {{ to.title }}
    </div>
  `,
})
export class UiFormTitleComponent extends FieldType {
  formControl!: FormControl


  public get Style() : string {
    return this.to.titleStyle ?? 'ml-2 text-gray-900 dark:text-red-50 lg:ml-0 text-3xl mt-5 mb-8 font-bold tracking-tight leading-none'
  }

}
