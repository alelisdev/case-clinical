import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-form-kanban-modal',
  template: `
    <div class="w-auto h-auto min-w-80 min-h-26 p-2" style="overflow: auto">
      <ui-formly-json-form
        class="w-full h-full"
        [formName]="formName"
        [showSubmitButton]="showSubmitButton"
        [model]="model"
        [componentStore]="store"
        [formData]="formData">
      </ui-formly-json-form>
    </div>
  `,
})
export class KanbanCardModalComponent {
  @Input() formName: string;
  @Input() model = {}
  @Input() store = {}
  @Input() showSubmitButton = false;
  @Input() formData = {}
}
