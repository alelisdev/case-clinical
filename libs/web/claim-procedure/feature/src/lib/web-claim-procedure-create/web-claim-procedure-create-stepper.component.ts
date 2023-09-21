
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { PlaceOfService,ClaimStatus,Claim,Appointment,Procedure } from '@case-clinical/web/core/data-access'
import { WebClaimProcedureCreateStore } from './web-claim-procedure-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-claim-procedure-create.component.html',
  providers: [WebClaimProcedureCreateStore],
})
export class WebClaimProcedureCreateComponent {
    readonly vm$ = this.store.vm$
    readonly placeOfServices$ = this.store.placeOfServices$
readonly claimStatuses$ = this.store.claimStatuses$
readonly claims$ = this.store.claims$
readonly appointments$ = this.store.appointments$
readonly procedures$ = this.store.procedures$

  model:any = {}

parentPlaceOfServiceId: ''
parentClaimStatusId: ''
parentClaimId: ''
parentAppointmentId: ''
parentProcedureId: ''

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
WebUiFormField.input('claimProcedureCodeId', { label: 'Claim Procedure Code Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('procedureCodeId', { label: 'Procedure Code Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.date('fromDateOfService', { label: 'From Date of Service' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('toDateOfService', { label: 'To Date of Service' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('nationalDrugCode', { label: 'National Drug Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('drugUnit', { label: 'Drug Unit' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('drugQuantity', { label: 'Drug Quantity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('quantity', { label: 'Quantity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('billedAmount', { label: 'Billed Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('approvedAmount', { label: 'Approved Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('adjustmentAmount', { label: 'Adjustment Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('netPaymentAmount', { label: 'Net Payment Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('paymentMethod', { label: 'Payment Method' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('internalMemo', { label: 'Internal Memo' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('explainationOfBenefitsComment', { label: 'Explaination of Benefits Comment' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('reason', { label: 'Reason' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('procedureCode', { label: 'Procedure Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('diagnosisPointer', { label: 'Diagnosis Pointer' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('modifier1', { label: 'Modifier 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('modifier2', { label: 'Modifier 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('modifier3', { label: 'Modifier 3' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('modifier4', { label: 'Modifier 4' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'place-of-service',
          'placeOfServiceId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('placeOfServiceId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPlaceOfServiceId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'claim-status',
          'claimStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('claimStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClaimStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'claim',
          'claimId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('claimId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClaimId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'appointment',
          'appointmentId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('appointmentId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAppointmentId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'procedure',
          'procedureId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('procedureId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureId = s
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
    private readonly store: WebClaimProcedureCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClaimProcedure(input) {

    if(this.parentPlaceOfServiceId != ''){
      input = {...input, placeOfServiceId: this.parentPlaceOfServiceId} 
    }


    if(this.parentClaimStatusId != ''){
      input = {...input, claimStatusId: this.parentClaimStatusId} 
    }


    if(this.parentClaimId != ''){
      input = {...input, claimId: this.parentClaimId} 
    }


    if(this.parentAppointmentId != ''){
      input = {...input, appointmentId: this.parentAppointmentId} 
    }


    if(this.parentProcedureId != ''){
      input = {...input, procedureId: this.parentProcedureId} 
    }


    this.store.createClaimProcedureEffect(input)
  }
}
