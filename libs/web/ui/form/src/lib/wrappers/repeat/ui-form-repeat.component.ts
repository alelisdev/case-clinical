import { Component, OnInit } from '@angular/core'
import { FieldArrayType } from '@ngx-formly/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'formly-repeat-section',
  styleUrls: ['./ui-form-repeat.component.scss'],
  template: `
  <div class="flex-row flex-auto w-full mb-1 py-3">
    <label
      *ngIf="to.label"
      [attr.for]="id"
      [ngClass]="className"
    >
      {{ to.label }}
    </label>
    <div *ngIf="to.required">
      <div *ngFor="let field of field.fieldGroup; let i = index;" [class]="ClassName">
        <formly-field  class="flex-1" [field]="field"></formly-field>
        <button
          [ngClass]="DeleteButtonClassName(field)"
          type="button"
          *ngIf="i !== 0"
          (click)="remove(i)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
    <div *ngIf="!to.required">
      <div *ngFor="let field of field.fieldGroup; let i = index;" [class]="ClassName">
        <formly-field  class="flex-1" [field]="field"></formly-field>
        <button
          [ngClass]="DeleteButtonClassName(field)"
          type="button"
          *ngIf="!to.readonly"
          (click)="remove(i)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
    <div *ngIf="!to.readonly" class="mt-2">
      <button
        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="button"
        (click)="this.addNext(field)"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <span class="text-sm">Add</span>
      <span class="font-medium text-sm">{{ to.addText }}</span>
      </button>
    </div>
  </div>
  `,
})
export class UiFormRepeatComponent extends FieldArrayType implements OnInit {

  title = ''

  public get ClassName(): string {
    return (this.to.fold || this.to.narrow) ? 'flex flex-col items-start gap-1 mt-1' : 'flex flex-col md:flex-row items-start gap-1 mt-1'
  }


  public DeleteButtonClassName(field: any): string {
    const className = 'inline-flex items-center px-3 py-2.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500';
    if (this.to.fold || this.to.narrow) {
      return `${className} mb-2`;
    } else {
      if (this.checkTopMargin(field)) {
        return `${className} mt-1`;
      } else {
        return `${className} md:mt-6 md:mb-2`;
      }
    }
  }

  ngOnInit(): void {
    if (this.to.require === true) {
      this.add()
    }
  }

  addNext(event) {
    if (this.field.fieldArray.fieldGroup.length > 0)
      this.add()
  }

  checkTopMargin(fieldgroup) {
    return fieldgroup?.fieldGroup[0]?.templateOptions.label == ''
  }
}
