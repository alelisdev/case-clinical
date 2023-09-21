import { of, switchMap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <input
      [class]="classes"
      [ngClass]="classNames"
      type="text"
      [mask]="to.mask"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.mask"
      [class.is-invalid]="showError"
    />
  `,
})
export class UiFormMaskedInputComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl
  subscriber;
  constructor() {
    super()
  }

  ngOnInit() {
    this.subscriber = this.formControl.valueChanges.subscribe((value) => {
      if(this.to.valueChanged && this.to.valueChanged instanceof Function) {
        this.to.valueChanged(value, this.form);
      }
    })

  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
    
  }

  get classNames(): string {
    return this.showError
      ? 'border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
      : ''
  }

  get classes(): string {
    return 'shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md block w-full sm:text-sm'
  }

}
