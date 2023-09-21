
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebTaskTagFormStore } from './web-task-tag-form.store'
import { TaskTag,TaskItem,Tag } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-task-tag-form',
  providers: [WebTaskTagFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Task Tag"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(taskTag))" [model]="taskTag" [fields]="fields" [form]="form">
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
export class WebFormsUiTaskTagComponent
    {
  @Input() taskTag: TaskTag = {}
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
          'taskId',
          {
            label: 'Task',
            options: [{id: 'CREATE', name: 'Create New Task'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterTaskItems('').pipe(
                  map((x:TaskItem)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'tagId',
          {
            label: 'Tag',
            options: [{id: 'CREATE', name: 'Create New Tag'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterTags('').pipe(
                  map((x:Tag)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),

WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
})				])

]

  constructor(
    private readonly store: WebTaskTagFormStore,
  ) {}

  submit({
name,taskId,tagId
  }) {
    this.send.emit({
name,taskId,tagId
    })
  }

handleDiscardClick(event) { }
}
