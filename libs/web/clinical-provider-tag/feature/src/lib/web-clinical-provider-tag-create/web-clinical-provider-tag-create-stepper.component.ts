
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ClinicalProvider,Tag } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderTagCreateStore } from './web-clinical-provider-tag-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-clinical-provider-tag-create.component.html',
  providers: [WebClinicalProviderTagCreateStore],
})
export class WebClinicalProviderTagCreateComponent {
    readonly vm$ = this.store.vm$
    readonly clinicalProviders$ = this.store.clinicalProviders$
readonly tags$ = this.store.tags$

  model:any = {}

parentClinicalProviderId: ''
parentTagId: ''

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
})
    
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
          'tag',
          'tagId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('tagId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTagId = s
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
    private readonly store: WebClinicalProviderTagCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClinicalProviderTag(input) {

    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    if(this.parentTagId != ''){
      input = {...input, tagId: this.parentTagId} 
    }


    this.store.createClinicalProviderTagEffect(input)
  }
}
