import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatCheckbox } from '@angular/material/checkbox';
import { FieldType } from '@ngx-formly/core'

@Component({
  styleUrls:['./style.scss'],
  template: `
    <div class="inline-flex items-end w-full mt-1.5 mb-1.5">
      <mat-checkbox [disabled]="to.readonly" #checkbox [color]="'primary'" (selectionChange)="onSelectionChanged($event)"  (valueChange)="onValueChanged($event)">
        <span class="text-gray-900 dark:text-gray-50" *ngIf="to.hideLabel !== true">{{ to.label }}</span>
      </mat-checkbox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormCheckboxComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild('checkbox') checkbox!: MatCheckbox
  formControl!: FormControl

  value: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if(this.formControl?.value) {
      this.value = this.formControl?.value;
    } else {
      this.formControl?.setValue(false)
      this.value = false;
    }

    this.formControl?.valueChanges.subscribe((changes) => {
      if(this.value !== changes) {
        this.value = changes
        this.checkbox.checked = changes;
        if(this.to.valueChanged && this.to.valueChanged instanceof Function) this.to.valueChanged(this.value, this.form);
      }
    })
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.checkbox.checked = this.value;
    }, 100)
    this.checkbox.change.subscribe(($event) => {
      if(this.value !== $event.checked) {
        this.value = $event.checked;
        this.formControl.setValue($event.checked)
        if(this.to.valueChanged && this.to.valueChanged instanceof Function) this.to.valueChanged(this.value, this.form);

      }
    })

  }

  onSelectionChanged($event) {
    this.value = $event.value;
    this.formControl.setValue($event.value)
  }

  onValueChanged($event) {
    console.log("onValueChanged")

  }
}
