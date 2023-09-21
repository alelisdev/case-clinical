
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Lead,Severity } from '@case-clinical/web/core/data-access'
import { WebLeadInjuryCreateStore } from './web-lead-injury-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-lead-injury-create.component.html',
  providers: [WebLeadInjuryCreateStore],
})
export class WebLeadInjuryCreateComponent {
    readonly vm$ = this.store.vm$
    readonly leads$ = this.store.leads$
readonly severities$ = this.store.severities$

  model:any = {}

parentLeadId: ''
parentSeverityId: ''

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
WebUiFormField.input('bodyPartId', { label: 'Body Part Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),

    
  WebUiFormField.selectForm(
          'lead',
          'leadId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('leadId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLeadId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'severity',
          'severityId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('severityId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentSeverityId = s
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
    private readonly store: WebLeadInjuryCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createLeadInjury(input) {

    if(this.parentLeadId != ''){
      input = {...input, leadId: this.parentLeadId} 
    }


    if(this.parentSeverityId != ''){
      input = {...input, severityId: this.parentSeverityId} 
    }


    this.store.createLeadInjuryEffect(input)
  }
}
