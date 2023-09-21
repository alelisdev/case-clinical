
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Patient,LegalCase } from '@case-clinical/web/core/data-access'
import { WebRequestAdditionalVisitCreateStore } from './web-request-additional-visit-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-request-additional-visit-create.component.html',
  providers: [WebRequestAdditionalVisitCreateStore],
})
export class WebRequestAdditionalVisitCreateComponent {
    readonly vm$ = this.store.vm$
    readonly patients$ = this.store.patients$
readonly legalCases$ = this.store.legalCases$

  model:any = {}

parentPatientId: ''
parentLegalCaseId: ''

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
WebUiFormField.input('requestingProviderId', { label: 'Requesting Provider Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.number('numberOfVisitsBeingRequested', { label: 'Number of Visits Being Requested' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
				])

  ]

  constructor(
    private readonly store: WebRequestAdditionalVisitCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRequestAdditionalVisit(input) {

    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    this.store.createRequestAdditionalVisitEffect(input)
  }
}
