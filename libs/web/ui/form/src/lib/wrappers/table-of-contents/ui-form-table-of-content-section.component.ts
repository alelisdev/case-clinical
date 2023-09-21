import { Component, ViewEncapsulation } from '@angular/core'
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-table-of-content-section',
  template: `
   <ng-container #fieldComponent></ng-container>
  `,
})
  
export class UiFormTableOfContentSectionComponent extends UiFormBaseField {

}
