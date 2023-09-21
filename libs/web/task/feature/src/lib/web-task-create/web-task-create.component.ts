
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Appointment } from '@case-clinical/web/core/data-access'
import { WebTaskCreateStore } from './web-task-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-task-create.component.html',
  providers: [WebTaskCreateStore],
})
export class WebTaskCreateComponent {
    readonly vm$ = this.store.vm$
    readonly appointments$ = this.store.appointments$

  model:any = {}

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
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
WebUiFormField.input('entity', { label: 'Entity' }, {className: 'w-full  px-1'}),
    
  WebUiFormField.select(
          'appointmentId',
          {
            label: 'Appointment',
            options: [{id: 'CREATE', name: 'Create New Appointment'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterAppointments('').pipe(
                  map((x:Appointment)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
				])

  ]

  constructor(
    private readonly store: WebTaskCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createTask(input) {
    this.store.createTaskEffect(input)
  }
}
