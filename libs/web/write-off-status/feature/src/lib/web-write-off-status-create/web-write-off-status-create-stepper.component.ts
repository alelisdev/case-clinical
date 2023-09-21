
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebWriteOffStatusCreateStore } from './web-write-off-status-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-write-off-status-create.component.html',
  providers: [WebWriteOffStatusCreateStore],
})
export class WebWriteOffStatusCreateComponent {
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

    				])

  ]

  constructor(
    private readonly store: WebWriteOffStatusCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createWriteOffStatus(input) {


    this.store.createWriteOffStatusEffect(input)
  }
}
