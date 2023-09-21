import { Component } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'

@Component({
  template: `
    <div class="flex mt-2 flex-wrap">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class GroupComponent extends FieldWrapper {}
