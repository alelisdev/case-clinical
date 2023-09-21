import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'

@Component({
  template: `
    <div [class.has-error]="showError" [ngClass]="to.compact ? '' : 'mb-3'">
      <label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id" [ngClass]="className">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
      </label>
      <div
        class="relative"
        (focusout)="onFocusOutEvent($event)"
        (click)="onClick($event)"
        [ngClass]="{
          forSelectForm:
            showError ||
            (formControl.status === 'INVALID' &&
              field.formControl &&
              (clicked || (field.options.parentForm && field.options.parentForm.submitted)))
        }"
      >
        <ng-template #fieldComponent></ng-template>

        <div
          class="absolute inset-y-0 right-0 flex items-center pointer-events-none"
          *ngIf="
            (showError ||
              (formControl.status === 'INVALID' &&
                field.formControl &&
                (clicked || (field.options.parentForm && field.options.parentForm.submitted)))) &&
            field.type !== 'file-new'
          "
          [ngClass]="{ 'pr-6': to.date, 'pr-3': !to.date }"
        ></div>
      </div>

      <div
        *ngIf="
          showError ||
          (formControl.status === 'INVALID' &&
            field.formControl &&
            (clicked || (field.options.parentForm && field.options.parentForm.submitted)))
        "
        class="mt-2 text-sm text-red-600"
        [style.display]="'block'"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <small *ngIf="to.description" class="mt-2 text-sm text-gray-500">{{ to.description }}</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormFieldComponent extends FieldWrapper implements OnInit {
  className = ''
  clicked = false
  ngOnInit(): void {
    if (this.to.labelStyle && this.to.labelStyle.trim().length > 0) {
      this.className = this.to.labelStyle
    } else {
      this.className = 'block text-md text-gray-600 dark:text-white'
    }
  }

  onClick($event) {
    // this.clicked = true;
  }

  onFocusOutEvent($event) {
    this.clicked = true
  }
}
