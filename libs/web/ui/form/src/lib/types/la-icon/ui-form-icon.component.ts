import { Component, OnInit } from '@angular/core'
import { UiFormBaseField } from '../base-field-type';

@Component({
  template: `
    <ui-la-icon
      [icon]="icon"
      [size]="to.size"
      [spin]="to.spin"
      [pulse]="to.pulse"
      [border]="to.border"
      [pull]="to.pull"
    ></ui-la-icon>
  `,
})
export class UiFormIconComponent extends UiFormBaseField implements OnInit {
  icon = 'phone';

  ngOnInit(): void {
    super.ngOnInit();

    if(this.to.icon) {
      this.icon = this.service.parseStatement(this.to.icon);
    }
  }

}
