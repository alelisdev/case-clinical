
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebFeeScheduleFormStore } from './web-fee-schedule-form.store'
import { FeeSchedule,Organization,Specialty } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-fee-schedule-form',
  providers: [WebFeeScheduleFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(feeSchedule))" [model]="feeSchedule ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiFeeScheduleComponent
    {
  @Input() feeSchedule: FeeSchedule = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentOrganizationId: ''
parentSpecialtyId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'organization',
          'organizationId',
        {
          defaultValues: {}, ////Set Parent Values
          createOrganization: (event) => {
            if(event?.name) {
              this.store.addOrganization(event)
              this.model.organizationId = event.id
              this.form.controls['organizationId'].patchValue(event.id)
              this.form.controls['organizationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterOrganizations('').subscribe((values) => {
              this.model.organizationId = selected?.id
              this.form.controls['organizationId'].patchValue(selected?.id)
              this.form.controls['organizationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Organization',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterOrganizations,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterOrganizations('').subscribe()
              this.route.params.pipe(pluck('organizationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentOrganizationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'specialty',
          'specialtyId',
        {
          defaultValues: {}, ////Set Parent Values
          createSpecialty: (event) => {
            if(event?.name) {
              this.store.addSpecialty(event)
              this.model.specialtyId = event.id
              this.form.controls['specialtyId'].patchValue(event.id)
              this.form.controls['specialtyId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterSpecialties('').subscribe((values) => {
              this.model.specialtyId = selected?.id
              this.form.controls['specialtyId'].patchValue(selected?.id)
              this.form.controls['specialtyId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Specialty',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterSpecialties,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterSpecialties('').subscribe()
              this.route.params.pipe(pluck('specialtyId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentSpecialtyId = s
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
WebUiFormField.input('code', { label: 'Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('modifier', { label: 'Modifier' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('description', { label: 'Description' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('medicarePhysicianNonFacilityRate', { label: 'Medicare Physician Non Facility Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('physicianNonFacilityFee', { label: 'Physician Non Facility Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('medicarePhysicianFacilityRate', { label: 'Medicare Physician Facility Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('physicianFacilityFee', { label: 'Physician Facility Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('baseUnit', { label: 'Base Unit' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('profCf', { label: 'Prof Cf' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})				])

]

  constructor(
    private readonly store: WebFeeScheduleFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,organizationId,specialtyId,code,modifier,description,medicarePhysicianNonFacilityRate,physicianNonFacilityFee,medicarePhysicianFacilityRate,physicianFacilityFee,baseUnit,profCf }) {
    
    if(this.parentOrganizationId != ''){
      organizationId = this.parentOrganizationId
    }


    if(this.parentSpecialtyId != ''){
      specialtyId = this.parentSpecialtyId
    }

    await this.store.createFeeScheduleEffect({ name,organizationId,specialtyId,code,modifier,description,medicarePhysicianNonFacilityRate,physicianNonFacilityFee,medicarePhysicianFacilityRate,physicianFacilityFee,baseUnit,profCf })

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
