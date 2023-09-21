import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { textAreaLengthValidator, onlyspaceValidator } from '../../validators'

@Component({
  template: `
    <textarea
      [formControl]="formControl"
      [ngClass]="classNames"
      [cols]="to.cols"
      [rows]="to.rows"
      class="shadow-sm block w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormTextareaComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl
  subscriber;

  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 3,
    },
  }

  ngOnInit()
  {
    if(!this.to.unlimitedLength)
    {
      this.formControl.addValidators([textAreaLengthValidator]);
    }
    this.formControl.updateValueAndValidity();
    this.subscriber = this.formControl.valueChanges.subscribe((value) => {
      if(this.to.valueChanged && this.to.valueChanged instanceof Function) {
        this.to.valueChanged(value);
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

  log(item) {
    console.log(item);
  }
  get classes(): string {
    return 'shadow-sm block w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-m'
  }
}
