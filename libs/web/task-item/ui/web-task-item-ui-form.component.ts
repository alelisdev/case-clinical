
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebTaskItemFormStore } from './web-task-item-form.store'
import { TaskItem,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-task-item-form',
  providers: [WebTaskItemFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Task Item"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(taskItem))" [model]="taskItem" [fields]="fields" [form]="form">
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
export class WebFormsUiTaskItemComponent
    {
  @Input() taskItem: TaskItem = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.select(
          'assignedToId',
          {
            label: 'Assigned To',
            options: [{id: 'CREATE', name: 'Create New Assigned To'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterUsers('').pipe(
                  map((x:User)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),

WebUiFormField.input('type', { label: 'Type' }, {className: 'w-full  px-1'}),
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'w-full  px-1'}),
WebUiFormField.input('legalCaseId', { label: 'Legal Case Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.number('order', { label: 'Order' }, {className: 'w-full  px-1'}),
WebUiFormField.number('priority', { label: 'Priority' }, {className: 'w-full  px-1'}),
WebUiFormField.input('legalCase', { label: 'Legal Case' }, {className: 'w-full  px-1'}),
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full  px-1'}),
WebUiFormField.date('dueDate', { label: 'Due Date' }, {className: 'w-full  px-1'}),
WebUiFormField.date('assignedDate', { label: 'Assigned Date' }, {className: 'w-full  px-1'}),
WebUiFormField.date('completedOn', { label: 'Completed On' }, {className: 'w-full  px-1'}),
WebUiFormField.input('completed', { label: 'Completed' }, {className: 'w-full  px-1'}),
				])

]

  constructor(
    private readonly store: WebTaskItemFormStore,
  ) {}

  submit({
type,name,notes,legalCaseId,order,priority,legalCase,assignedToId,title,dueDate,assignedDate,completedOn,completed
  }) {
    this.send.emit({
type,name,notes,legalCaseId,order,priority,legalCase,assignedToId,title,dueDate,assignedDate,completedOn,completed
    })
  }

handleDiscardClick(event) { }
}
