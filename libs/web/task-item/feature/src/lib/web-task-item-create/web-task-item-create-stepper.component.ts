
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { LegalCase,User } from '@case-clinical/web/core/data-access'
import { WebTaskItemCreateStore } from './web-task-item-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-task-item-create.component.html',
  providers: [WebTaskItemCreateStore],
})
export class WebTaskItemCreateComponent {
    readonly vm$ = this.store.vm$
    readonly legalCases$ = this.store.legalCases$
readonly users$ = this.store.users$

  model:any = {}

parentLegalCaseId: ''
parentAssignedToId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('type', { label: 'Type' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.input('notes', { label: 'Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.number('order', { label: 'Order' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('priority', { label: 'Priority' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dueDate', { label: 'Due Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('assignedDate', { label: 'Assigned Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('completedOn', { label: 'Completed on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('completed', { label: 'Completed' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('legalCaseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLegalCaseId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'user',
          'assignedToId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('assignedToId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAssignedToId = s
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
    private readonly store: WebTaskItemCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createTaskItem(input) {

    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    if(this.parentAssignedToId != ''){
      input = {...input, assignedToId: this.parentAssignedToId} 
    }


    this.store.createTaskItemEffect(input)
  }
}
