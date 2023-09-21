
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Task,Appointment } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-task-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Task"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(task))" [model]="task" [fields]="fields" [form]="form">
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
export class WebFormsUiTaskComponent
    {
  @Input() task: Task = {}
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
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full  px-1'}),
WebUiFormField.date('dueDate', { label: 'Due Date' }, {className: 'w-full  px-1'}),
WebUiFormField.date('assignedDate', { label: 'Assigned Date' }, {className: 'w-full  px-1'}),
WebUiFormField.date('completedOn', { label: 'Completed On' }, {className: 'w-full  px-1'}),
WebUiFormField.input('completed', { label: 'Completed' }, {className: 'w-full  px-1'}),
WebUiFormField.input('completionNotes', { label: 'Completion Notes' }, {className: 'w-full  px-1'}),
WebUiFormField.input('assignedToId', { label: 'Assigned To Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('taskCategoryId', { label: 'Task Category Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('taskSubCategoryId', { label: 'Task Sub Category Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('taskStatus', { label: 'Task Status' }, {className: 'w-full  px-1'}),
WebUiFormField.input('taskPriorityName', { label: 'Task Priority Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('assignedUser', { label: 'Assigned User' }, {className: 'w-full  px-1'}),
WebUiFormField.input('subject', { label: 'Subject' }, {className: 'w-full  px-1'}),
WebUiFormField.input('summary', { label: 'Summary' }, {className: 'w-full  px-1'}),
WebUiFormField.date('dueBy', { label: 'Due By' }, {className: 'w-full  px-1'}),
WebUiFormField.date('scheduledFor', { label: 'Scheduled For' }, {className: 'w-full  px-1'}),
WebUiFormField.date('dateClosed', { label: 'Date Closed' }, {className: 'w-full  px-1'}),
WebUiFormField.input('closedBy', { label: 'Closed By' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('isImportant', { label: 'Is Important' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('temp', { label: 'Temp' }, {className: 'w-full  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created By' }, {className: 'w-full  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-1/4  p-3' }),
WebUiFormField.date('taskCompletedDate', { label: 'Task Completed Date' }, {className: 'w-full  px-1'}),
WebUiFormField.input('migSource', { label: 'Mig Source' }, {className: 'w-full  px-1'}),
WebUiFormField.input('entity', { label: 'Entity' }, {className: 'w-full  px-1'})]


  submit({
name,title,dueDate,assignedDate,completedOn,completed,completionNotes,assignedToId,appointmentId,taskCategoryId,taskSubCategoryId,taskStatus,taskPriorityName,assignedUser,subject,summary,dueBy,scheduledFor,dateClosed,closedBy,isImportant,temp,createdBy,dateCreated,removed,taskCompletedDate,migSource,entity
  }) {
    this.send.emit({
name,title,dueDate,assignedDate,completedOn,completed,completionNotes,assignedToId,appointmentId,taskCategoryId,taskSubCategoryId,taskStatus,taskPriorityName,assignedUser,subject,summary,dueBy,scheduledFor,dateClosed,closedBy,isImportant,temp,createdBy,dateCreated,removed,taskCompletedDate,migSource,entity
    })
  }

handleDiscardClick(event) { }
}
