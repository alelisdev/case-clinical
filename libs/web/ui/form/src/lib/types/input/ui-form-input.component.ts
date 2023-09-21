/* eslint-disable no-case-declarations */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { debounceTime } from 'rxjs/operators'
import {
  atLeastOneLowerValidator,
  atLeastOneNumberValidator,
  atLeastOneSpecialValidator,
  atLeastOneUpperValidator,
  inputMaxLengthValidator,
  inputSpecialCharacterContainValidator,
  onlyspaceValidator,
} from '../../validators'
import { isContainValue } from '@case-clinical/shared/util/helpers'
import { MenuPositionX, MenuPositionY } from '@angular/material/menu'
import { NgxMaterialPopoverComponent } from 'ngx-material-popover'

@Component({
  template: `
    <ng-container [ngSwitch]="type">
      <ng-container *ngSwitchCase="'number'">
        <input
          [class]="classes"
          [ngClass]="classNames"
          type="number"
          [min]="min"
          (keydown)="keydown($event)"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [class.is-invalid]="showError"
        />
      </ng-container>
      <ng-container *ngSwitchCase="'currency'">
        <input
          [class]="classes"
          [ngClass]="classNames"
          type="text"
          mask="separator.2"
          thousandSeparator=","
          decimalMarker="."
          (keydown)="keydown($event)"
          [prefix]="to?.prefix || '$ '"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [class.is-invalid]="showError"
        />
      </ng-container>
      <ng-container *ngSwitchCase="'integer'">
        <input
          [class]="classes"
          [ngClass]="classNames"
          type="text"
          mask="0*"
          thousandSeparator=","
          [formControl]="formControl"
          [formlyAttributes]="field"
          [class.is-invalid]="showError"
        />
      </ng-container>
      <ng-container *ngSwitchCase="'password'">
        <ngx-material-popover
          [popoverContent]="popoverContent"
          [xPosition]="xPosition"
          [popoverOnHover]="true"
          [popoverCloseOnMouseOutside]="true"
          [yPosition]="yPosition"
          #popover="ngxMaterialPopover"
          mode="hover"
        >
          <div style="height:42px; width:100%">
            <input
              [class]="classes"
              [ngClass]="classNames"
              type="password"
              thousandSeparator=","
              (keydown)="keydown($event)"
              [formControl]="formControl"
              [formlyAttributes]="field"
              [class.is-invalid]="showError"
              #passwordField
            />
            <div style="cursor: pointer;" (click)="togglePasswordVisibility(passwordField)">
              <ui-la-icon
                [icon]="showPassword ? 'eye' : 'eye-slash'"
                [size]="'2x'"
                style="position:absolute;right:15px;bottom:4px;"
              ></ui-la-icon>
            </div>
          </div>
        </ngx-material-popover>
        <ng-template #popoverContent>
          <div class="text-md text-gray-500  duration-300 bg-white w-full dark:bg-gray-800  dark:text-gray-400">
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
              <div class="grid grid-cols-4 gap-2">
                <div *ngFor="let item of yellowBar">
                  <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                </div>
                <div *ngFor="let item of grayBar">
                  <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
                </div>
              </div>
              <p>It’s better to have:</p>
              <ul>
                <li class="flex items-center mb-1">
                  <div *ngIf="upperAndLower">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      role="img"
                      class="w-3 h-3 mr-2.5 las la-check la-1x text-green-400"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M28.281 6.281L11 23.563 3.719 16.28 2.28 17.72l8 8 .719.687.719-.687 18-18z"
                      ></path>
                    </svg>
                  </div>
                  <div *ngIf="!upperAndLower">
                    <svg
                      class="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  Upper & lower case letters
                </li>
                <li class="flex items-center mb-1">
                  <div *ngIf="symbol">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      role="img"
                      class="w-3 h-3 mr-2.5 las la-check la-1x text-green-400"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M28.281 6.281L11 23.563 3.719 16.28 2.28 17.72l8 8 .719.687.719-.687 18-18z"
                      ></path>
                    </svg>
                  </div>
                  <div *ngIf="!symbol">
                    <svg
                      class="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  A symbol (#$&)
                </li>
                <li class="flex items-center">
                  <div *ngIf="longer">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      role="img"
                      class="w-3 h-3 mr-2.5 las la-check la-1x text-green-400"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M28.281 6.281L11 23.563 3.719 16.28 2.28 17.72l8 8 .719.687.719-.687 18-18z"
                      ></path>
                    </svg>
                  </div>
                  <div *ngIf="!longer">
                  <svg
                      class="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  A longer password (min. 12 chars.)
                </li>
              </ul>
            </div>
          </div>
        </ng-template>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <input
          [class]="classes"
          [ngClass]="classNames"
          [type]="type"
          [placeholder]="'I am not a wellknown field'"
          [readOnly]="to.readOnly"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [class.is-invalid]="showError"
          (click)="onClick($event)"
        />
      </ng-container>
    </ng-container>
  `,
})
export class UiFormInputComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl
  subscriber
  disabled = true
  min: number | undefined = undefined
  showPassword = false
  currentValue: any

  upperAndLower = false
  symbol = false
  longer = false
  yellowBar = []
  grayBar = []
  @ViewChild('popover', { static: true })
  readonly popover!: NgxMaterialPopoverComponent
  xPosition: MenuPositionX = 'after'
  yPosition: MenuPositionY = 'below'

  constructor() {
    super()
  }

  togglePasswordVisibility(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password'
    this.showPassword = !this.showPassword
  }

  keydown(event) {
    const downKey = event?.key?.charCodeAt(0)
    //console.log("downKey", event?.key, this.type)
    const keyValue = event?.key
    switch (this.type) {
      case 'number':
        if (this.to.positive) {
          if (downKey == 189 || downKey == 109) return false
          else return true
        }
        if (Number(this.formControl.value + keyValue) >= 9999999999 && downKey >= 48 && downKey <= 57) return false
        if (this.to.maxValue) {
          if (Number(this.formControl.value + keyValue) > Number(this.to.maxValue) && downKey >= 48 && downKey <= 57)
            return false
        }
        return true
      case 'currency':
        if (Number(this.formControl.value ?? '' + keyValue) > 999999999 && downKey >= 48 && downKey <= 57) {
          return false
        } else return true
      case 'password':
        const validSymbolRegex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
        const testString = this.formControl.value ?? '' + keyValue
        this.symbol = validSymbolRegex.test(testString)
        const validUpperRegex = /(?=.*[A-Z])/
        const validLowerRegex = /(?=.*[a-z])/
        this.upperAndLower = validUpperRegex.test(testString) && validLowerRegex.test(testString)
        this.longer = testString.length > 11 ? true : false
        const yellowNum = Math.floor((testString.length + 1) / 3) > 4 ? 4 : Math.floor((testString.length + 1) / 3)
        const grayNum = Math.abs(4 - yellowNum)
        this.yellowBar = Array.from({ length: yellowNum }, (_, i) => 1)
        this.grayBar = Array.from({ length: grayNum }, (_, i) => 1)
        if (keyValue === ' ') return false
        else return true
    }
    if (!isContainValue(['integer', 'number', 'currency'], this.type)) {
      if (this.to.isBankNumber) {
        return (
          (downKey > 64 && downKey < 91) ||
          (downKey > 96 && downKey < 123) ||
          downKey == 8 ||
          downKey == 32 ||
          (downKey >= 48 && downKey <= 57)
        )
      }
      return true
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  omit_special_char() {}

  ngOnInit() {
    // If max or min is set, then add required validator automatically
    if (this.to.isBankNumber) {
      this.formControl.addValidators([inputSpecialCharacterContainValidator])
      this.formControl.updateValueAndValidity()
      return true
    }
    if (this.to.max || this.to.min) {
      if (!this.to.required) {
        this.to.required = true
        this.formControl.updateValueAndValidity()
      }
    }

    if (this.type == 'number' && this.to.positive) {
      this.min = 0
    }

    if (this.type === 'password' && this.to.passwordStrength) {
      this.formControl.addValidators([
        atLeastOneUpperValidator,
        atLeastOneLowerValidator,
        atLeastOneSpecialValidator,
      ])
      this.formControl.updateValueAndValidity()
      console.log('Password Strength')
    }

    const noNeedOSpaceTypes = ['integer', 'number']
    if (!isContainValue(noNeedOSpaceTypes, this.type)) {
      if (this.to.required) {
        if (!this.formControl.hasValidator(onlyspaceValidator)) {
          this.formControl.addValidators([onlyspaceValidator])
          this.formControl.updateValueAndValidity()
        }
      } else {
        if (this.formControl.hasValidator(onlyspaceValidator)) {
          this.formControl.removeValidators([onlyspaceValidator])
          this.formControl.updateValueAndValidity()
        }
      }
    }

    const inputSpecialTypes = ['integer', 'number', 'currency']


    if (!isContainValue(inputSpecialTypes, this.type) && !this.to.required) {
      this.formControl.addValidators([inputMaxLengthValidator])
    }

    if (this.to.valueChanged && this.to.valueChanged instanceof Function) {
      if(this.formControl.value != null && this.formControl.value != undefined && this.currentValue !== this.formControl.value ){
        this.to.valueChanged(this.formControl.value)
      }
      this.subscriber = this.formControl.valueChanges.pipe(debounceTime(this.to.debounce ?? 100)).subscribe((value) => {
        if (this.currentValue !== value) {
          this.currentValue = value
          if (!isContainValue(inputSpecialTypes, this.type)) this.to.valueChanged(value)
          else this.to.valueChanged(value, this.form, this.model)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }
  get type(): string {
    return this.to.type || 'text'
  }

  float(value: string): number {
    if (typeof value === 'number') {
      return value
    }
    return parseFloat(value.replace(/[^0-9.-]+/g, ''))
  }

  keyup($event) {
    const value = this.float(this.formControl.value)
    console.log({ value })
    this.formControl.setValue(this.float(this.formControl.value))
  }

  onClick($event) {
    if (this.type === 'time') {
      $event.srcElement.showPicker()
    }
  }
  get classNames(): string {
    return this.showError
      ? 'border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
      : ''
  }

  log(item) {
    console.log(item)
  }
  get classes(): string {
    return 'shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md block w-full sm:text-sm'
  }
}
