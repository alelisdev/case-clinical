
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Lead } from '@case-clinical/web/core/data-access'
import { WebLeadActionCreateStore } from './web-lead-action-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-lead-action-create.component.html',
  providers: [WebLeadActionCreateStore],
})
export class WebLeadActionCreateComponent {
    readonly vm$ = this.store.vm$
    readonly leads$ = this.store.leads$

  model:any = {}

parentLeadId: ''

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
				])

  ]

  constructor(
    private readonly store: WebLeadActionCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createLeadAction(input) {

    if(this.parentLeadId != ''){
      input = {...input, leadId: this.parentLeadId} 
    }


    this.store.createLeadActionEffect(input)
  }
}
