import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'

@Component({
  template: `
    <div class='flex flex-row gap-2'>
      <mat-form-field class="fuse-mat-no-subscript w-30" style="font-size: 12px;">
        <mat-select
            (selectionChange)="onSelectionChanged($event)">
            <ng-container *ngFor="let code of phoneCodes">
                <mat-option [value]="code">{{ '+(' + code + ")" }}</mat-option>
            </ng-container>
        </mat-select>
      </mat-form-field>
      <input
        [class]="classes"
        [ngClass]="classNames"
        type="text"
        placeholder='(000) 000 0000'
        (keyup)="changed($event)"
        [mask]="'(000) 000 0000'"
        [formlyAttributes]="field"
        [placeholder]="'(000) 000 0000'"
        [class.is-invalid]="showError"
      />
    </div>
  `,
})
export class UiFormPhoneInputComponent extends FieldType implements OnInit {
  formControl!: FormControl

  code = '';
  number = '';

  phoneCodes = [
    '1',
    '55',
    '86',
    '33',
    '220'
  ]

  constructor() {
    super()
  }

  ngOnInit() {

  }

  onSelectionChanged($event) {
    console.log($event);
    this.code = $event.value;
    this.setValue();
  }

  changed($event) {
    console.log($event.target.value);
    this.number = $event.target.value;
    this.setValue();
  }

  setValue() {
    this.formControl.setValue(`+(${this.code})${this.number}`)
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
