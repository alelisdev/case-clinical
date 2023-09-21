
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Guideline,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebPriorAuthGuidelineCreateStore } from './web-prior-auth-guideline-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prior-auth-guideline-create.component.html',
  providers: [WebPriorAuthGuidelineCreateStore],
})
export class WebPriorAuthGuidelineCreateComponent {
    readonly vm$ = this.store.vm$
    readonly guidelines$ = this.store.guidelines$
readonly priorAuthorizationRequests$ = this.store.priorAuthorizationRequests$

  model:any = {}

parentGuidelineId: ''
parentPriorAuthorizationRequestId: ''

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
          'guideline',
          'guidelineId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('guidelineId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentGuidelineId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'prior-authorization-request',
          'priorAuthorizationRequestId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('priorAuthorizationRequestId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPriorAuthorizationRequestId = s
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
    private readonly store: WebPriorAuthGuidelineCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPriorAuthGuideline(input) {

    if(this.parentGuidelineId != ''){
      input = {...input, guidelineId: this.parentGuidelineId} 
    }


    if(this.parentPriorAuthorizationRequestId != ''){
      input = {...input, priorAuthorizationRequestId: this.parentPriorAuthorizationRequestId} 
    }


    this.store.createPriorAuthGuidelineEffect(input)
  }
}
