
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { CaseAccount,WriteOffStatus } from '@case-clinical/web/core/data-access'
import { WebWriteOffCreateStore } from './web-write-off-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-write-off-create.component.html',
  providers: [WebWriteOffCreateStore],
})
export class WebWriteOffCreateComponent {
    readonly vm$ = this.store.vm$
    readonly caseAccounts$ = this.store.caseAccounts$
readonly writeOffStatuses$ = this.store.writeOffStatuses$

  model:any = {}

parentAccountId: ''
parentWriteOffStatusId: ''

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
}),
WebUiFormField.currency('amount', { label: 'Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created by' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'case-account',
          'accountId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('accountId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAccountId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'write-off-status',
          'writeOffStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('writeOffStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentWriteOffStatusId = s
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
    private readonly store: WebWriteOffCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createWriteOff(input) {

    if(this.parentAccountId != ''){
      input = {...input, accountId: this.parentAccountId} 
    }


    if(this.parentWriteOffStatusId != ''){
      input = {...input, writeOffStatusId: this.parentWriteOffStatusId} 
    }


    this.store.createWriteOffEffect(input)
  }
}
