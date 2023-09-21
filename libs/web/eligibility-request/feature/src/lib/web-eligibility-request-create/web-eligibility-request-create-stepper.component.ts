
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { EligibilityStatus } from '@case-clinical/web/core/data-access'
import { WebEligibilityRequestCreateStore } from './web-eligibility-request-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-eligibility-request-create.component.html',
  providers: [WebEligibilityRequestCreateStore],
})
export class WebEligibilityRequestCreateComponent {
    readonly vm$ = this.store.vm$
    readonly eligibilityStatuses$ = this.store.eligibilityStatuses$

  model:any = {}

parentEligibilityStatusId: ''

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
WebUiFormField.input('providerId', { label: 'Provider Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('specialtyId', { label: 'Specialty Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('locationId', { label: 'Location Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('visitTypeId', { label: 'Visit Type Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('taxID', { label: 'Tax ID' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date of Birth' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('memberRegistrationNumber', { label: 'Member Registration Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'eligibility-status',
          'eligibilityStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('eligibilityStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentEligibilityStatusId = s
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
    private readonly store: WebEligibilityRequestCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createEligibilityRequest(input) {

    if(this.parentEligibilityStatusId != ''){
      input = {...input, eligibilityStatusId: this.parentEligibilityStatusId} 
    }


    this.store.createEligibilityRequestEffect(input)
  }
}
