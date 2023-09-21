import { Component, Output, EventEmitter } from '@angular/core'
import { FieldType } from '@ngx-formly/core'

@Component({
  selector: 'ui-web-lead-form',
  template: `
    <ui-lead-form
      class="flex-grow flex flex-col"
      [formName]="'lead_create'"
      [formControl]="formControl"
      class="flex-grow flex flex-col"
      (send)="save($event)"
      (close)="cancel()"
      [lead]="{}"
    >
    </ui-lead-form>
  `,
})
export class WebLeadFormComponent extends FieldType {
  save($event) {
    if(this.to.save && this.to.save instanceof Function) {
      this.to.save($event);
    }
  }

  cancel() {
    if(this.to.cancel && this.to.cancel instanceof Function) {
      this.to.cancel();
    }
  }
}
