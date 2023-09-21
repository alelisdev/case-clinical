
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Lead,BodyPart } from '@case-clinical/web/core/data-access'
import { WebBodyPartLeadCreateStore } from './web-body-part-lead-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-body-part-lead-create.component.html',
  providers: [WebBodyPartLeadCreateStore],
})
export class WebBodyPartLeadCreateComponent {
    readonly vm$ = this.store.vm$
    readonly leads$ = this.store.leads$
readonly bodyParts$ = this.store.bodyParts$

  model:any = {}

parentLeadId: ''
parentBodyPartId: ''

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
          'body-part',
          'bodyPartId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('bodyPartId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentBodyPartId = s
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
    private readonly store: WebBodyPartLeadCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createBodyPartLead(input) {

    if(this.parentLeadId != ''){
      input = {...input, leadId: this.parentLeadId} 
    }


    if(this.parentBodyPartId != ''){
      input = {...input, bodyPartId: this.parentBodyPartId} 
    }


    this.store.createBodyPartLeadEffect(input)
  }
}
