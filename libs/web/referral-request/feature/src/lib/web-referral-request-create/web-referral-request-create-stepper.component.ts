
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Patient,LegalCase,ClinicalProvider,ClinicalProviderLocation } from '@case-clinical/web/core/data-access'
import { WebReferralRequestCreateStore } from './web-referral-request-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-referral-request-create.component.html',
  providers: [WebReferralRequestCreateStore],
})
export class WebReferralRequestCreateComponent {
    readonly vm$ = this.store.vm$
    readonly patients$ = this.store.patients$
readonly legalCases$ = this.store.legalCases$
readonly clinicalProviders$ = this.store.clinicalProviders$
readonly clinicalProviderLocations$ = this.store.clinicalProviderLocations$

  model:any = {}

parentPatientId: ''
parentLegalCaseId: ''
parentRequestingProviderId: ''
parentReferredToId: ''
parentClinicalProviderLocationId: ''

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
WebUiFormField.input('status', { label: 'Status' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
,

  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          'clinical-provider',
          'requestingProviderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('requestingProviderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentRequestingProviderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'clinical-provider',
          'referredToId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('referredToId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentReferredToId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'clinical-provider-location',
          'clinicalProviderLocationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('clinicalProviderLocationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClinicalProviderLocationId = s
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
    private readonly store: WebReferralRequestCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createReferralRequest(input) {

    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    if(this.parentRequestingProviderId != ''){
      input = {...input, requestingProviderId: this.parentRequestingProviderId} 
    }


    if(this.parentReferredToId != ''){
      input = {...input, referredToId: this.parentReferredToId} 
    }


    if(this.parentClinicalProviderLocationId != ''){
      input = {...input, clinicalProviderLocationId: this.parentClinicalProviderLocationId} 
    }


    this.store.createReferralRequestEffect(input)
  }
}
