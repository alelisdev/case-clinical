import { Component } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'

@Component({
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends FieldWrapper {
  public get className() : string {
    let classNameStr = this.to.light ? 'bg-white dark:bg-white dark:bg-opacity-5' : 'bg-card'
    if(!this.to.condensed) {
      classNameStr = `${classNameStr} pb-6 pt-4 shadow rounded-2xl mb-5 px-6`;
    }
    return classNameStr;
  }
}
