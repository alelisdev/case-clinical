import { Component } from '@angular/core'
import { FieldArrayType } from '@ngx-formly/core'

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index" class="flex">
      <formly-field class="w-5/6" [field]="field"></formly-field>
      <div>
        <button
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          type="button"
          (click)="remove(i)"
        >
          Remove
        </button>
      </div>
    </div>
    <div class="m-3">
      <button
        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="button"
        (click)="this.addNext(field)"
      >
        {{ to.addText }}
      </button>
    </div>
  `,
})
export class UiFormRepeatComponent extends FieldArrayType {
  addNext(event) {
    console.log(event)
    this.add()
  }
}
