
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebClaimFormStore } from './web-claim-form.store'
import { Claim,PriorAuthorizationRequest,Patient } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-claim-form',
  providers: [WebClaimFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(claim))" [model]="claim ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiClaimComponent
    {
  @Input() claim: Claim = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentPriorAuthorizationRequestId: ''
parentPatientId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'prior-authorization-request',
          'priorAuthorizationRequestId',
        {
          defaultValues: {}, ////Set Parent Values
          createPriorAuthorizationRequest: (event) => {
            if(event?.name) {
              this.store.addPriorAuthorizationRequest(event)
              this.model.priorAuthorizationRequestId = event.id
              this.form.controls['priorAuthorizationRequestId'].patchValue(event.id)
              this.form.controls['priorAuthorizationRequestId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPriorAuthorizationRequests('').subscribe((values) => {
              this.model.priorAuthorizationRequestId = selected?.id
              this.form.controls['priorAuthorizationRequestId'].patchValue(selected?.id)
              this.form.controls['priorAuthorizationRequestId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Prior Authorization Request',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPriorAuthorizationRequests,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPriorAuthorizationRequests('').subscribe()
              this.route.params.pipe(pluck('priorAuthorizationRequestId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPriorAuthorizationRequestId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'patient',
          'patientId',
        {
          defaultValues: {}, ////Set Parent Values
          createPatient: (event) => {
            if(event?.name) {
              this.store.addPatient(event)
              this.model.patientId = event.id
              this.form.controls['patientId'].patchValue(event.id)
              this.form.controls['patientId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPatients('').subscribe((values) => {
              this.model.patientId = selected?.id
              this.form.controls['patientId'].patchValue(selected?.id)
              this.form.controls['patientId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Patient',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPatients,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPatients('').subscribe()
              this.route.params.pipe(pluck('patientId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPatientId = s
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
WebUiFormField.date('originalRecordDate', { label: 'Original Record Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('receivedDate', { label: 'Received Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dueDate', { label: 'Due Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientName', { label: 'Patient Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientDob', { label: 'Patient Dob' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientAddressLine1', { label: 'Patient Address Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientAddressCity', { label: 'Patient Address City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientAddressState', { label: 'Patient Address State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientAddressPostalCode', { label: 'Patient Address Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('carrierName', { label: 'Carrier Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('carrierLine1', { label: 'Carrier Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('carrierLine2', { label: 'Carrier Line 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('carrierCity', { label: 'Carrier City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('carrierState', { label: 'Carrier State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('carrierPostalCode', { label: 'Carrier Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insuredName', { label: 'Insured Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insuredLine1', { label: 'Insured Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insuredCity', { label: 'Insured City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insuredState', { label: 'Insured State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insuredPostalCode', { label: 'Insured Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('patientSignature', { label: 'Patient Signature' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode1', { label: 'Diagnosis Code 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode2', { label: 'Diagnosis Code 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode3', { label: 'Diagnosis Code 3' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode4', { label: 'Diagnosis Code 4' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode5', { label: 'Diagnosis Code 5' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode6', { label: 'Diagnosis Code 6' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode7', { label: 'Diagnosis Code 7' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode8', { label: 'Diagnosis Code 8' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('federalTaxId', { label: 'Federal Tax Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('totalCharges', { label: 'Total Charges' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('amountPaid', { label: 'Amount Paid' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('physicianSignature', { label: 'Physician Signature' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('physicianSignedOn', { label: 'Physician Signed On' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('serviceFacility', { label: 'Service Facility' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityLine1', { label: 'Service Facility Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityCity', { label: 'Service Facility City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityState', { label: 'Service Facility State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityPostalCode', { label: 'Service Facility Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityNpi', { label: 'Service Facility Npi' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingFacility', { label: 'Billing Facility' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingLine1', { label: 'Billing Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingCity', { label: 'Billing City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingState', { label: 'Billing State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingPostalCode', { label: 'Billing Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingNpi', { label: 'Billing Npi' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingPhoneNumber', { label: 'Billing Phone Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billingOther', { label: 'Billing Other' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('sessionNotes', { label: 'Session Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('referringProvider', { label: 'Referring Provider' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('referringProviderNpi', { label: 'Referring Provider Npi' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('additionalClaimInfo', { label: 'Additional Claim Info' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('accountNumber', { label: 'Account Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('referenceNumber', { label: 'Reference Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('facility', { label: 'Facility' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('priorAuthorizationNumber', { label: 'Prior Authorization Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('providerName', { label: 'Provider Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('providerNumber', { label: 'Provider Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('vendor', { label: 'Vendor' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('vendorLine1', { label: 'Vendor Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('vendorCSZ', { label: 'Vendor CSZ' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('vendorTaxId', { label: 'Vendor Tax Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.currency('totalApprovedAmount', { label: 'Total Approved Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('totalBilledAmount', { label: 'Total Billed Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('totalNetPayAmount', { label: 'Total Net Pay Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
				])

]

  constructor(
    private readonly store: WebClaimFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,originalRecordDate,receivedDate,dueDate,patientName,patientDob,patientAddressLine1,patientAddressCity,patientAddressState,patientAddressPostalCode,carrierName,carrierLine1,carrierLine2,carrierCity,carrierState,carrierPostalCode,insuredName,insuredLine1,insuredCity,insuredState,insuredPostalCode,patientSignature,diagnosisCode1,diagnosisCode2,diagnosisCode3,diagnosisCode4,diagnosisCode5,diagnosisCode6,diagnosisCode7,diagnosisCode8,federalTaxId,totalCharges,amountPaid,physicianSignature,physicianSignedOn,serviceFacility,serviceFacilityLine1,serviceFacilityCity,serviceFacilityState,serviceFacilityPostalCode,serviceFacilityNpi,billingFacility,billingLine1,billingCity,billingState,billingPostalCode,billingNpi,billingPhoneNumber,billingOther,sessionNotes,referringProvider,referringProviderNpi,additionalClaimInfo,accountNumber,referenceNumber,facility,priorAuthorizationNumber,priorAuthorizationRequestId,providerName,providerNumber,vendor,vendorLine1,vendorCSZ,vendorTaxId,totalApprovedAmount,totalBilledAmount,totalNetPayAmount,notes,patientId }) {
    
    if(this.parentPriorAuthorizationRequestId != ''){
      priorAuthorizationRequestId = this.parentPriorAuthorizationRequestId
    }


    if(this.parentPatientId != ''){
      patientId = this.parentPatientId
    }

    await this.store.createClaimEffect({ name,originalRecordDate,receivedDate,dueDate,patientName,patientDob,patientAddressLine1,patientAddressCity,patientAddressState,patientAddressPostalCode,carrierName,carrierLine1,carrierLine2,carrierCity,carrierState,carrierPostalCode,insuredName,insuredLine1,insuredCity,insuredState,insuredPostalCode,patientSignature,diagnosisCode1,diagnosisCode2,diagnosisCode3,diagnosisCode4,diagnosisCode5,diagnosisCode6,diagnosisCode7,diagnosisCode8,federalTaxId,totalCharges,amountPaid,physicianSignature,physicianSignedOn,serviceFacility,serviceFacilityLine1,serviceFacilityCity,serviceFacilityState,serviceFacilityPostalCode,serviceFacilityNpi,billingFacility,billingLine1,billingCity,billingState,billingPostalCode,billingNpi,billingPhoneNumber,billingOther,sessionNotes,referringProvider,referringProviderNpi,additionalClaimInfo,accountNumber,referenceNumber,facility,priorAuthorizationNumber,priorAuthorizationRequestId,providerName,providerNumber,vendor,vendorLine1,vendorCSZ,vendorTaxId,totalApprovedAmount,totalBilledAmount,totalNetPayAmount,notes,patientId })

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
