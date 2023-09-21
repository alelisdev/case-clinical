
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { LegalCase } from '@case-clinical/web/core/data-access'
import { WebBalanceRequestCreateStore } from './web-balance-request-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-balance-request-create.component.html',
  providers: [WebBalanceRequestCreateStore],
})
export class WebBalanceRequestCreateComponent {
    readonly vm$ = this.store.vm$
    readonly documents$ = this.store.documents$
readonly legalCases$ = this.store.legalCases$

  model:any = {}

parentStatementId: ''
parentLegalCaseId: ''

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
WebUiFormField.date('requestedOn', { label: 'Requested on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('repliedOn', { label: 'Replied on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('status', { label: 'Status' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('type', { label: 'Type' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('balanceAmount', { label: 'Balance Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.file(
      'statement',
      {
        label: 'Statement',
        delete: (d) => {
          this.model.statement = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.statement = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

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
				])

  ]

  constructor(
    private readonly store: WebBalanceRequestCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createBalanceRequest(input) {

    if(this.parentStatementId != ''){
      input = {...input, statementId: this.parentStatementId} 
    }


    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    this.store.createBalanceRequestEffect(input)
  }
}
