
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Contract } from '@case-clinical/web/core/data-access'
import { WebContractTermCreateStore } from './web-contract-term-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contract-term-create.component.html',
  providers: [WebContractTermCreateStore],
})
export class WebContractTermCreateComponent {
    readonly vm$ = this.store.vm$
    readonly contracts$ = this.store.contracts$

  model:any = {}

parentContractTermId: ''

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
WebUiFormField.currency('maxApproved', { label: 'Max Approved' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('numberIncluded', { label: 'Number Included' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('factor', { label: 'Factor' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'contract',
          'contractTermId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contractTermId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContractTermId = s
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
    private readonly store: WebContractTermCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContractTerm(input) {

    if(this.parentContractTermId != ''){
      input = {...input, contractTermId: this.parentContractTermId} 
    }


    this.store.createContractTermEffect(input)
  }
}
