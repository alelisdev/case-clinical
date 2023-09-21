
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ClinicalProvider,Location } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderLocationCreateStore } from './web-clinical-provider-location-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-clinical-provider-location-create.component.html',
  providers: [WebClinicalProviderLocationCreateStore],
})
export class WebClinicalProviderLocationCreateComponent {
    readonly vm$ = this.store.vm$
    readonly clinicalProviders$ = this.store.clinicalProviders$
readonly locations$ = this.store.locations$

  model:any = {}

parentClinicalProviderId: ''
parentLocationId: ''

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

    
  WebUiFormField.selectForm(
          'clinical-provider',
          'clinicalProviderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('clinicalProviderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClinicalProviderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'location',
          'locationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('locationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLocationId = s
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
    private readonly store: WebClinicalProviderLocationCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClinicalProviderLocation(input) {

    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    if(this.parentLocationId != ''){
      input = {...input, locationId: this.parentLocationId} 
    }


    this.store.createClinicalProviderLocationEffect(input)
  }
}
