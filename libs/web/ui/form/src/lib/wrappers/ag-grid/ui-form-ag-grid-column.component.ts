import { Component, ViewEncapsulation } from '@angular/core'
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss'],
  selector: 'ui-ag-grid-component-column',
  template: `
   <div></div>
  `,
})

export class UiFormAgGridColumnComponent extends UiFormBaseField {

}
