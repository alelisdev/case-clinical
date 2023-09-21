
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { TaskItem,Tag } from '@case-clinical/web/core/data-access'
import { WebTaskTagCreateStore } from './web-task-tag-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-task-tag-create.component.html',
  providers: [WebTaskTagCreateStore],
})
export class WebTaskTagCreateComponent {
    readonly vm$ = this.store.vm$
    readonly taskItems$ = this.store.taskItems$
readonly tags$ = this.store.tags$

  model:any = {}

parentTaskId: ''
parentTagId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
})
    
  WebUiFormField.selectForm(
          'task-item',
          'taskId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('taskId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTaskId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'tag',
          'tagId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('tagId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTagId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
				])

  ]

  constructor(
    private readonly store: WebTaskTagCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createTaskTag(input) {

    if(this.parentTaskId != ''){
      input = {...input, taskId: this.parentTaskId} 
    }


    if(this.parentTagId != ''){
      input = {...input, tagId: this.parentTagId} 
    }


    this.store.createTaskTagEffect(input)
  }
}
