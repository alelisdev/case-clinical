
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebContractedRateKindCreateStore } from './web-contracted-rate-kind-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contracted-rate-kind-create.component.html',
  providers: [WebContractedRateKindCreateStore],
})
export class WebContractedRateKindCreateComponent {
    readonly vm$ = this.store.vm$
    

  model:any = {}



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
WebUiFormField.input('code', { label: 'Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('value', { label: 'Value' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    				])

  ]

  constructor(
    private readonly store: WebContractedRateKindCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContractedRateKind(input) {


    this.store.createContractedRateKindEffect(input)
  }
}
