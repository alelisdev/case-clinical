import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'ui-search',
  template: `
    <div class=" dark:border-gray-700 w-full">
      <div class="relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
          <ui-icon
            class="h-4 w-4 transition duration-150 ease-in-out"
            [class.text-blue-700]="focused"
            icon="search"
          ></ui-icon>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          [value]="value"
          (input)="valueChange.emit($event.target.value)"
          (keyup.enter)="onSubmit()"
          (focus)="onFocus()"
          (blur)="onBlur()"
          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 text-gray-600 dark:text-gray-300 dark:bg-transparent dark:border-gray-600 rounded-md"
          placeholder="Search..."
        />
        <button
          title="Clear"
          (click)="onClearClick()"
          class="absolute inset-y-0 right-0 pr-3 pl-2 flex h-full items-center text-gray-500 hover:text-red-700 transition duration-150 ease-in-out"
          [class.opacity-0]="!showClearButton"
          [class.opacity-100]="showClearButton"
        >
          <ui-icon class="h-4 w-4" icon="delete"></ui-icon>
        </button>
      </div>
    </div>
  `,
})
export class WebUiSearchComponent {
  private _value: string
  focused = false


  @Output() valueChange = new EventEmitter<string>()
  @Output() submit = new EventEmitter<void>()
  @Output() focus = new EventEmitter<void>()
  @Output() blur = new EventEmitter<void>()

  @Input()
  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value ?? '';
  }

  get showClearButton() {
    return this.value?.length > 0
  }

  setValue(val: string) {
    this._value = val;
    this.valueChange.emit(val);
  }

  onFocus() {
    this.focus.emit()
    this.focused = true
  }

  onBlur() {
    this.blur.emit()
    this.focused = false
  }

  onSubmit() {
    this.submit.emit()
  }

  onClearClick() {
    this._value = '';
    this.valueChange.emit('')
  }
}
