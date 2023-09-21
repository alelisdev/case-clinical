
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { PriorAuthorizationRequest,Patient } from '@case-clinical/web/core/data-access'
import { WebClaimCreateStore } from './web-claim-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-claim-create.component.html',
  providers: [WebClaimCreateStore],
})
export class WebClaimCreateComponent {
    readonly vm$ = this.store.vm$
    readonly priorAuthorizationRequests$ = this.store.priorAuthorizationRequests$
readonly documents$ = this.store.documents$
readonly patients$ = this.store.patients$

  model:any = {}

parentPriorAuthorizationRequestId: ''
parentClaimId: ''
parentExplanationOfPaymentId: ''
parentPatientId: ''

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
WebUiFormField.date('originalRecordDate', { label: 'Original Record Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('receivedDate', { label: 'Received Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dueDate', { label: 'Due Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientName', { label: 'Patient Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientPhoneNumber', { label: 'Patient Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientDob', { label: 'Patient Dob' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientAddressLine1', { label: 'Patient Address Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientAddressCity', { label: 'Patient Address City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientAddressState', { label: 'Patient Address State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientAddressPostalCode', { label: 'Patient Address Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('carrierName', { label: 'Carrier Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('carrierLine1', { label: 'Carrier Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('carrierLine2', { label: 'Carrier Line 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('carrierCity', { label: 'Carrier City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('carrierState', { label: 'Carrier State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('carrierPostalCode', { label: 'Carrier Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('insuredName', { label: 'Insured Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('insuredLine1', { label: 'Insured Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('insuredCity', { label: 'Insured City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('insuredState', { label: 'Insured State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('insuredPostalCode', { label: 'Insured Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('patientSignature', { label: 'Patient Signature' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode1', { label: 'Diagnosis Code 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode2', { label: 'Diagnosis Code 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode3', { label: 'Diagnosis Code 3' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode4', { label: 'Diagnosis Code 4' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode5', { label: 'Diagnosis Code 5' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode6', { label: 'Diagnosis Code 6' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode7', { label: 'Diagnosis Code 7' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisCode8', { label: 'Diagnosis Code 8' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('federalTaxId', { label: 'Federal Tax Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('totalCharges', { label: 'Total Charges' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('amountPaid', { label: 'Amount Paid' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('physicianSignature', { label: 'Physician Signature' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('physicianSignedOn', { label: 'Physician Signed on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('serviceFacility', { label: 'Service Facility' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityLine1', { label: 'Service Facility Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityCity', { label: 'Service Facility City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityState', { label: 'Service Facility State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityPostalCode', { label: 'Service Facility Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('serviceFacilityNpi', { label: 'Service Facility Npi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingFacility', { label: 'Billing Facility' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingLine1', { label: 'Billing Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingCity', { label: 'Billing City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingState', { label: 'Billing State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingPostalCode', { label: 'Billing Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingNpi', { label: 'Billing Npi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingPhoneNumber', { label: 'Billing Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billingOther', { label: 'Billing Other' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('sessionNotes', { label: 'Session Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('referringProvider', { label: 'Referring Provider' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('referringProviderNpi', { label: 'Referring Provider Npi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('additionalClaimInfo', { label: 'Additional Claim Info' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('accountNumber', { label: 'Account Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('referenceNumber', { label: 'Reference Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('facility', { label: 'Facility' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('priorAuthorizationNumber', { label: 'Prior Authorization Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('providerName', { label: 'Provider Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('providerNumber', { label: 'Provider Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('vendor', { label: 'Vendor' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('vendorLine1', { label: 'Vendor Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('vendorCSZ', { label: 'Vendor CSZ' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('vendorTaxId', { label: 'Vendor Tax Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.currency('totalApprovedAmount', { label: 'Total Approved Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('totalBilledAmount', { label: 'Total Billed Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('totalNetPayAmount', { label: 'Total Net Pay Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),

    
  WebUiFormField.selectForm(
          'prior-authorization-request',
          'priorAuthorizationRequestId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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

  WebUiFormField.file(
      'claim',
      {
        label: 'Claim',
        delete: (d) => {
          this.model.claim = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.claim = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.file(
      'explanationOfPayment',
      {
        label: 'Explanation of Payment',
        delete: (d) => {
          this.model.explanationOfPayment = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.explanationOfPayment = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.selectForm(
          'patient',
          'patientId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebClaimCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClaim(input) {

    if(this.parentPriorAuthorizationRequestId != ''){
      input = {...input, priorAuthorizationRequestId: this.parentPriorAuthorizationRequestId} 
    }


    if(this.parentClaimId != ''){
      input = {...input, claimId: this.parentClaimId} 
    }


    if(this.parentExplanationOfPaymentId != ''){
      input = {...input, explanationOfPaymentId: this.parentExplanationOfPaymentId} 
    }


    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    this.store.createClaimEffect(input)
  }
}
