
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { CaseAccount } from '@case-clinical/web/core/data-access'
import { WebJournalEntryCreateStore } from './web-journal-entry-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-journal-entry-create.component.html',
  providers: [WebJournalEntryCreateStore],
})
export class WebJournalEntryCreateComponent {
    readonly vm$ = this.store.vm$
    readonly caseAccounts$ = this.store.caseAccounts$

  model:any = {}

parentCaseAccountId: ''

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
WebUiFormField.input('locationName', { label: 'Location Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('fromTo', { label: 'From to' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('frequency', { label: 'Frequency' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('autoOrManual', { label: 'Auto or Manual' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('process', { label: 'Process' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('perAccountOrAggregateJE', { label: 'Per Account or Aggregate JE' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('costRate', { label: 'Cost Rate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('postingDate', { label: 'Posting Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('documentDate', { label: 'Document Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dueDate', { label: 'Due Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('amount', { label: 'Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('accountType', { label: 'Account Type' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('accountNumber', { label: 'Account Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('costCenter', { label: 'Cost Center' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('appliesToDocumentNumber', { label: 'Applies to Document Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'case-account',
          'caseAccountId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('caseAccountId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCaseAccountId = s
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
    private readonly store: WebJournalEntryCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createJournalEntry(input) {

    if(this.parentCaseAccountId != ''){
      input = {...input, caseAccountId: this.parentCaseAccountId} 
    }


    this.store.createJournalEntryEffect(input)
  }
}
