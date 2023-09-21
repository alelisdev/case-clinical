
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Shortcut,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-shortcut-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Shortcut"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(shortcut))" [model]="shortcut" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label = "Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label = "Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiShortcutComponent
    {
  @Input() shortcut: Shortcut = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [				WebUiFormField.fieldRow([
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('label', { label: 'Label' }, {className: 'w-full  px-1'}),
WebUiFormField.input('description', { label: 'Description' }, {className: 'w-full  px-1'}),
WebUiFormField.input('icon', { label: 'Icon' }, {className: 'w-full  px-1'}),
WebUiFormField.input('link', { label: 'Link' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('useRouter', { label: 'Use Router' }, { className: 'w-1/4  p-3' })]


  submit({
label,description,icon,link,useRouter,userId
  }) {
    this.send.emit({
label,description,icon,link,useRouter,userId
    })
  }

handleDiscardClick(event) { }
}
