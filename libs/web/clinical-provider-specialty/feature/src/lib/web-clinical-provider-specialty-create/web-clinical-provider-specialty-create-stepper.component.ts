
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ClinicalProvider,Specialty } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderSpecialtyCreateStore } from './web-clinical-provider-specialty-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-clinical-provider-specialty-create.component.html',
  providers: [WebClinicalProviderSpecialtyCreateStore],
})
export class WebClinicalProviderSpecialtyCreateComponent {
    readonly vm$ = this.store.vm$
    readonly clinicalProviders$ = this.store.clinicalProviders$
readonly specialties$ = this.store.specialties$

  model:any = {}

parentClinicalProviderId: ''
parentSpecialtyId: ''

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
WebUiFormField.input('npi', { label: 'Npi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
          'specialty',
          'specialtyId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebClinicalProviderSpecialtyCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClinicalProviderSpecialty(input) {

    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    if(this.parentSpecialtyId != ''){
      input = {...input, specialtyId: this.parentSpecialtyId} 
    }


    this.store.createClinicalProviderSpecialtyEffect(input)
  }
}
