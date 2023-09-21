
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebExperienceCreateStore } from './web-experience-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-experience-create.component.html',
  providers: [WebExperienceCreateStore],
})
export class WebExperienceCreateComponent {
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
WebUiFormField.date('createdAt', { label: 'Created at' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('updatedAt', { label: 'Updated at' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.input('workplace', { label: 'Workplace' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('from', { label: 'From' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('to', { label: 'To' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
    private readonly store: WebExperienceCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createExperience(input) {

    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    this.store.createExperienceEffect(input)
  }
}
