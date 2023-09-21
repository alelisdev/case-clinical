
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebPatientFormStore } from './web-patient-form.store'
import { Patient,Gender,Language } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-patient-form',
  providers: [WebPatientFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(patient))" [model]="patient ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiPatientComponent
    {
  @Input() patient: Patient = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentGenderId: ''
parentLanguageId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'gender',
          'genderId',
        {
          defaultValues: {}, ////Set Parent Values
          createGender: (event) => {
            if(event?.name) {
              this.store.addGender(event)
              this.model.genderId = event.id
              this.form.controls['genderId'].patchValue(event.id)
              this.form.controls['genderId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterGenders('').subscribe((values) => {
              this.model.genderId = selected?.id
              this.form.controls['genderId'].patchValue(selected?.id)
              this.form.controls['genderId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Gender',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterGenders,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterGenders('').subscribe()
              this.route.params.pipe(pluck('genderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentGenderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'language',
          'languageId',
        {
          defaultValues: {}, ////Set Parent Values
          createLanguage: (event) => {
            if(event?.name) {
              this.store.addLanguage(event)
              this.model.languageId = event.id
              this.form.controls['languageId'].patchValue(event.id)
              this.form.controls['languageId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLanguages('').subscribe((values) => {
              this.model.languageId = selected?.id
              this.form.controls['languageId'].patchValue(selected?.id)
              this.form.controls['languageId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Language',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLanguages,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLanguages('').subscribe()
              this.route.params.pipe(pluck('languageId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLanguageId = s
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
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('middleName', { label: 'Middle Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('suffix', { label: 'Suffix' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('nickname', { label: 'Nickname' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('height', { label: 'Height' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('weight', { label: 'Weight' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date Of Birth' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryPhoneNumber', { label: 'Primary Phone Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('isPrimaryPhoneMobile', { label: 'Is Primary Phone Mobile' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('secondaryPhoneNumber', { label: 'Secondary Phone Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('isSecondaryPhoneMobile', { label: 'Is Secondary Phone Mobile' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('memberRegistrationNumber', { label: 'Member Registration Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('ethnicityId', { label: 'Ethnicity Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.checkbox('requiresTranslator', { label: 'Requires Translator' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('socialSecurityNumber', { label: 'Social Security Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('honorific', { label: 'Honorific' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryEmailAddress', { label: 'Primary Email Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressLine1', { label: 'Primary Address Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressLine2', { label: 'Primary Address Line 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressCity', { label: 'Primary Address City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressStateOrProvince', { label: 'Primary Address State Or Province' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressPostalCode', { label: 'Primary Address Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('latitude', { label: 'Latitude' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('longitude', { label: 'Longitude' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('emergencyContactId', { label: 'Emergency Contact Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('homePhoneNumber', { label: 'Home Phone Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('mobileNumber', { label: 'Mobile Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bmi', { label: 'Bmi' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('occupation', { label: 'Occupation' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('debtorRemarks', { label: 'Debtor Remarks' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('workAddressLine1', { label: 'Work Address Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('workAddressLine2', { label: 'Work Address Line 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('workAddressCity', { label: 'Work Address City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('workAddressStateOrProvince', { label: 'Work Address State Or Province' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('workAddressPostalCode', { label: 'Work Address Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('workLatitude', { label: 'Work Latitude' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('workLongitude', { label: 'Work Longitude' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
,
,
,
				])

]

  constructor(
    private readonly store: WebPatientFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,firstName,middleName,lastName,suffix,genderId,nickname,height,weight,dateOfBirth,primaryPhoneNumber,isPrimaryPhoneMobile,secondaryPhoneNumber,isSecondaryPhoneMobile,memberRegistrationNumber,ethnicityId,languageId,requiresTranslator,socialSecurityNumber,honorific,primaryEmailAddress,primaryAddressLine1,primaryAddressLine2,primaryAddressCity,primaryAddressStateOrProvince,primaryAddressPostalCode,notes,latitude,longitude,emergencyContactId,homePhoneNumber,mobileNumber,bmi,occupation,debtorRemarks,workAddressLine1,workAddressLine2,workAddressCity,workAddressStateOrProvince,workAddressPostalCode,workLatitude  ,workLongitude }) {
    
    if(this.parentGenderId != ''){
      genderId = this.parentGenderId
    }


    if(this.parentLanguageId != ''){
      languageId = this.parentLanguageId
    }

    await this.store.createPatientEffect({ name,firstName,middleName,lastName,suffix,genderId,nickname,height,weight,dateOfBirth,primaryPhoneNumber,isPrimaryPhoneMobile,secondaryPhoneNumber,isSecondaryPhoneMobile,memberRegistrationNumber,ethnicityId,languageId,requiresTranslator,socialSecurityNumber,honorific,primaryEmailAddress,primaryAddressLine1,primaryAddressLine2,primaryAddressCity,primaryAddressStateOrProvince,primaryAddressPostalCode,notes,latitude,longitude,emergencyContactId,homePhoneNumber,mobileNumber,bmi,occupation,debtorRemarks,workAddressLine1,workAddressLine2,workAddressCity,workAddressStateOrProvince,workAddressPostalCode,workLatitude  ,workLongitude  })

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
