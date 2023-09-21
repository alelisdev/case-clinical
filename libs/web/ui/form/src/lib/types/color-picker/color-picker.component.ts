import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-color-picker',
  template: `
    <div class="flex flex-row gap-2 items-center">
      <input
        style="height: 30px !important; width: 30px;"
        [(colorPicker)]="color"
        class="cursor-pointer"
        readonly
        [style.background]="color"
        (colorPickerChange)="colorPickerChange($event)"
      />
      <span class='text-gray-900 dark:text-gray-50 text-md'>{{ color }}</span>
    </div>
  `,
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent extends FieldType implements OnInit {
  formControl!: FormControl
  color = '#ff0000';

  ngOnInit(): void {
    if(this.formControl.value) {
      this.color = this.formControl.value;
    } else {
      this.formControl.setValue(this.color)
    }
  }

  colorPickerChange(value) {
    this.color = value;
    this.formControl.setValue(this.color)
  }
}
