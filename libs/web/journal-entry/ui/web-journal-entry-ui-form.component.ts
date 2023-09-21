
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebJournalEntryFormStore } from './web-journal-entry-form.store'
import { JournalEntry,CaseAccount } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-journal-entry-form',
  providers: [WebJournalEntryFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(journalEntry))" [model]="journalEntry ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiJournalEntryComponent
    {
  @Input() journalEntry: JournalEntry = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentCaseAccountId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'case-account',
          'caseAccountId',
        {
          defaultValues: {}, ////Set Parent Values
          createCaseAccount: (event) => {
            if(event?.name) {
              this.store.addCaseAccount(event)
              this.model.caseAccountId = event.id
              this.form.controls['caseAccountId'].patchValue(event.id)
              this.form.controls['caseAccountId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterCaseAccounts('').subscribe((values) => {
              this.model.caseAccountId = selected?.id
              this.form.controls['caseAccountId'].patchValue(selected?.id)
              this.form.controls['caseAccountId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Case Account',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterCaseAccounts,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterCaseAccounts('').subscribe()
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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('locationName', { label: 'Location Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('fromTo', { label: 'From To' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('frequency', { label: 'Frequency' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('autoOrManual', { label: 'Auto Or Manual' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('process', { label: 'Process' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('perAccountOrAggregateJE', { label: 'Per Account Or Aggregate JE' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('costRate', { label: 'Cost Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('accountType', { label: 'Account Type' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('accountNumber', { label: 'Account Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('costCenter', { label: 'Cost Center' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('appliesToDocumentNumber', { label: 'Applies To Document Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})				])

]

  constructor(
    private readonly store: WebJournalEntryFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,locationName,fromTo,frequency,autoOrManual,process,perAccountOrAggregateJE,costRate,accountType,accountNumber,costCenter,appliesToDocumentNumber,caseAccountId }) {
    
    if(this.parentCaseAccountId != ''){
      caseAccountId = this.parentCaseAccountId
    }

    await this.store.createJournalEntryEffect({ name,locationName,fromTo,frequency,autoOrManual,process,perAccountOrAggregateJE,costRate,accountType,accountNumber,costCenter,appliesToDocumentNumber,caseAccountId })

    await this.store.item$.pipe(
      tap((item) => {
        if(item) {
          this.send.emit(item)
        }
      })
    ).subscribe()
  }

  handleDiscardClick(event) { 
     this.send.emit(event)
  }
}
