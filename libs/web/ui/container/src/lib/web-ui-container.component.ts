import { Component } from '@angular/core'

@Component({
  selector: 'ui-container',
  template: `
    <div class="mx-auto px-3 md:px-6 lg:px-8 ">
      <ng-content></ng-content>
    </div>
  `,
})
export class WebUiContainerComponent {}
