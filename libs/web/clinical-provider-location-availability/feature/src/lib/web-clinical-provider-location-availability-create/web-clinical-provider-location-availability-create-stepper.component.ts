
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ClinicalProviderLocation } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderLocationAvailabilityCreateStore } from './web-clinical-provider-location-availability-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-clinical-provider-location-availability-create.component.html',
  providers: [WebClinicalProviderLocationAvailabilityCreateStore],
})
export class WebClinicalProviderLocationAvailabilityCreateComponent {
    readonly vm$ = this.store.vm$
    readonly clinicalProviderLocations$ = this.store.clinicalProviderLocations$

  model:any = {}

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
WebUiFormField.input('day', { label: 'Day' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('startTime', { label: 'Start Time' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('endTime', { label: 'End Time' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
    private readonly store: WebClinicalProviderLocationAvailabilityCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClinicalProviderLocationAvailability(input) {

    if(this.parentClinicalProviderLocationId != ''){
      input = {...input, clinicalProviderLocationId: this.parentClinicalProviderLocationId} 
    }


    this.store.createClinicalProviderLocationAvailabilityEffect(input)
  }
}
