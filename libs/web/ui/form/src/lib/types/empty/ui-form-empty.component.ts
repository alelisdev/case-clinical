import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'

@Component({
  template: `
   <div class="bg-card px-2 py-1 rounded-md border-2 text-gray-900 dark:text-gray-50 text-center w-full font-bold italic line-through">{{ to.message }} has not been registered</div>
  `,
})
export class UiFormEmptyComponent extends FieldType {

}
