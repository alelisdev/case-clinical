
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebCaseProcedureFormStore } from './web-case-procedure-form.store'
import { CaseProcedure,LegalCase,Location } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-case-procedure-form',
  providers: [WebCaseProcedureFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(caseProcedure))" [model]="caseProcedure ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiCaseProcedureComponent
    {
  @Input() caseProcedure: CaseProcedure = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentLegalCaseId: ''
parentLocationId: ''

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

  WebUiFormField.selectForm(
          'location',
          'locationId',
        {
          defaultValues: {}, ////Set Parent Values
          createLocation: (event) => {
            if(event?.name) {
              this.store.addLocation(event)
              this.model.locationId = event.id
              this.form.controls['locationId'].patchValue(event.id)
              this.form.controls['locationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLocations('').subscribe((values) => {
              this.model.locationId = selected?.id
              this.form.controls['locationId'].patchValue(selected?.id)
              this.form.controls['locationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Location',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLocations,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLocations('').subscribe()
              this.route.params.pipe(pluck('locationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLocationId = s
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
WebUiFormField.date('procedureDate', { label: 'Procedure Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('cost', { label: 'Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created By' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('approvedDate', { label: 'Approved Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('procedureReasonName', { label: 'Procedure Reason Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('decisionDate', { label: 'Decision Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('nextActionDate', { label: 'Next Action Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
				])

]

  constructor(
    private readonly store: WebCaseProcedureFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,legalCaseId,locationId,procedureDate,cost,notes,createdBy,dateCreated,removed,approvedDate,procedureReasonName,decisionDate,nextActionDate }) {
    
    if(this.parentLegalCaseId != ''){
      legalCaseId = this.parentLegalCaseId
    }


    if(this.parentLocationId != ''){
      locationId = this.parentLocationId
    }

    await this.store.createCaseProcedureEffect({ name,legalCaseId,locationId,procedureDate,cost,notes,createdBy,dateCreated,removed,approvedDate,procedureReasonName,decisionDate,nextActionDate })

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
