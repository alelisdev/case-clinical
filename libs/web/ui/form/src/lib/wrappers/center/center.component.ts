import { Component, OnInit } from '@angular/core'
import { UiFormBaseWrapper } from '../base-field-wrapper';

@Component({
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <formly-field [field]="chiledField" *ngFor="let chiledField of field.fieldGroup"></formly-field>
    </div>
  `,
})
export class CenterComponent extends UiFormBaseWrapper implements OnInit {

}
