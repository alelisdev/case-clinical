import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-item',
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-sm">
      <div class="w-full border-b-2 border-gray-200/50 px-5 py-4 flex flex-row gap-4 cursor-pointer">
        <mat-slide-toggle [color]="'primary'" (change)="onChange($event)">
        </mat-slide-toggle>
        <span
          class="pl-5 text-base leading-6 text-left border-l border-solid cursor-pointer border-zinc-300 text-gray-900 dark:text-gray-100">
          {{ title }}
        </span>
        <div class="flex-1"></div>
      </div>
      <div class="w-full px-5 py-4 min-h-16" *ngIf="open">
        <ui-formly-json-form
          [formName]="formName"
          [showSubmitButton]="true"
          [formData]="formData"
          (save)="submit($event)"
        ></ui-formly-json-form>
      </div>
    </div>
  `
})
export class FeatureItemComponent implements OnInit {
  @Input() name: string
  @Input() title: string

  formName = ""
  open = false;

  formData = {

  }

  ngOnInit(): void {
    this.formName = `${this.name}_setting`
  }
  onChange($event) {
    console.log($event)
    this.open = $event.checked;
  }

  submit(formData) {
    alert(JSON.stringify(formData))
  }
}
