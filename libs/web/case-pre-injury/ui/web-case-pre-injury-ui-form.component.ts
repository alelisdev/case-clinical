
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebCasePreInjuryFormStore } from './web-case-pre-injury-form.store'
import { CasePreInjury,LegalCase } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-case-pre-injury-form',
  providers: [WebCasePreInjuryFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(casePreInjury))" [model]="casePreInjury ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiCasePreInjuryComponent
    {
  @Input() casePreInjury: CasePreInjury = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentLegalCaseId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          createLegalCase: (event) => {
            if(event?.name) {
              this.store.addLegalCase(event)
              this.model.legalCaseId = event.id
              this.form.controls['legalCaseId'].patchValue(event.id)
              this.form.controls['legalCaseId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLegalCases('').subscribe((values) => {
              this.model.legalCaseId = selected?.id
              this.form.controls['legalCaseId'].patchValue(selected?.id)
              this.form.controls['legalCaseId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Legal Case',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLegalCases,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLegalCases('').subscribe()
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
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.checkbox('affectsInjury', { label: 'Affects Injury' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('injuryDate', { label: 'Injury Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('injured', { label: 'Injured' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('anatomic', { label: 'Anatomic' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' })				])

]

  constructor(
    private readonly store: WebCasePreInjuryFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,legalCaseId,affectsInjury,injuryDate,injured,anatomic,dateCreated,removed }) {
    
    if(this.parentLegalCaseId != ''){
      legalCaseId = this.parentLegalCaseId
    }

    await this.store.createCasePreInjuryEffect({ name,legalCaseId,affectsInjury,injuryDate,injured,anatomic,dateCreated,removed })

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
