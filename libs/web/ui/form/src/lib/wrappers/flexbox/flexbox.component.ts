import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { UiFormBaseWrapper } from '../base-field-wrapper';

@Component({
  template: `
    <div class="flex" [ngClass]="innerClass">
      <formly-field [field]="chiledField" *ngFor="let chiledField of field.fieldGroup"></formly-field>
    </div>
  `,
})
export class FlexBoxComponent extends UiFormBaseWrapper implements OnInit {

  innerClass = '';

  ngOnInit(): void {
    const innerClasses = [];
    const outerClasses = [];
    this.to.className.split(' ').map((cls) => {
      if (cls.trim().length === 0) return;

      if (cls.includes('flex') || cls.includes('justify') || cls.includes('items') || cls.includes('gap')) {
        if(cls === 'justify-between') {
          innerClasses.push('h-full');
        }
        innerClasses.push(cls);
      } else {
        outerClasses.push(cls);
      }
    })

    this.field.className = outerClasses.join(' ');
    this.innerClass = innerClasses.join(' ');
  }
}
