
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebInsuranceFormStore } from './web-insurance-form.store'
import { Insurance,LegalCase,InsuranceType,InsuranceSector } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-insurance-form',
  providers: [WebInsuranceFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(insurance))" [model]="insurance ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiInsuranceComponent
    {
  @Input() insurance: Insurance = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentLegalCaseId: ''
parentInsuranceTypeId: ''
parentInsuranceSectorId: ''

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
          'insurance-type',
          'insuranceTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createInsuranceType: (event) => {
            if(event?.name) {
              this.store.addInsuranceType(event)
              this.model.insuranceTypeId = event.id
              this.form.controls['insuranceTypeId'].patchValue(event.id)
              this.form.controls['insuranceTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterInsuranceTypes('').subscribe((values) => {
              this.model.insuranceTypeId = selected?.id
              this.form.controls['insuranceTypeId'].patchValue(selected?.id)
              this.form.controls['insuranceTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Insurance Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterInsuranceTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterInsuranceTypes('').subscribe()
              this.route.params.pipe(pluck('insuranceTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentInsuranceTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'insurance-sector',
          'insuranceSectorId',
        {
          defaultValues: {}, ////Set Parent Values
          createInsuranceSector: (event) => {
            if(event?.name) {
              this.store.addInsuranceSector(event)
              this.model.insuranceSectorId = event.id
              this.form.controls['insuranceSectorId'].patchValue(event.id)
              this.form.controls['insuranceSectorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterInsuranceSectors('').subscribe((values) => {
              this.model.insuranceSectorId = selected?.id
              this.form.controls['insuranceSectorId'].patchValue(selected?.id)
              this.form.controls['insuranceSectorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Insurance Sector',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterInsuranceSectors,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterInsuranceSectors('').subscribe()
              this.route.params.pipe(pluck('insuranceSectorId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentInsuranceSectorId = s
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
WebUiFormField.input('policyNumber', { label: 'Policy Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insuranceCompany', { label: 'Insurance Company' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('minimumCoverageAmount', { label: 'Minimum Coverage Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('maximumCoverageAmount', { label: 'Maximum Coverage Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('isStackable', { label: 'Is Stackable' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('adjuster', { label: 'Adjuster' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})				])

]

  constructor(
    private readonly store: WebInsuranceFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,legalCaseId,insuranceTypeId,insuranceSectorId,policyNumber,insuranceCompany,minimumCoverageAmount,maximumCoverageAmount,isStackable,adjuster }) {
    
    if(this.parentLegalCaseId != ''){
      legalCaseId = this.parentLegalCaseId
    }


    if(this.parentInsuranceTypeId != ''){
      insuranceTypeId = this.parentInsuranceTypeId
    }


    if(this.parentInsuranceSectorId != ''){
      insuranceSectorId = this.parentInsuranceSectorId
    }

    await this.store.createInsuranceEffect({ name,legalCaseId,insuranceTypeId,insuranceSectorId,policyNumber,insuranceCompany,minimumCoverageAmount,maximumCoverageAmount,isStackable,adjuster })

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
