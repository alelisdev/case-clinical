
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebMedicalConditionProviderCreateStore } from './web-medical-condition-provider-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-medical-condition-provider-create.component.html',
  providers: [WebMedicalConditionProviderCreateStore],
})
export class WebMedicalConditionProviderCreateComponent {
    readonly vm$ = this.store.vm$
    readonly clinicalProviders$ = this.store.clinicalProviders$

  model:any = {}

parentClinicalProviderId: ''

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
WebUiFormField.input('medicalConditionId', { label: 'Medical Condition Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),

    
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
				])

  ]

  constructor(
    private readonly store: WebMedicalConditionProviderCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createMedicalConditionProvider(input) {

    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    this.store.createMedicalConditionProviderEffect(input)
  }
}
