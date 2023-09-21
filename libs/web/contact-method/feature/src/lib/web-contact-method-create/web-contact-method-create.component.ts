
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebContactMethodCreateStore } from './web-contact-method-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-method-create.component.html',
  providers: [WebContactMethodCreateStore],
})
export class WebContactMethodCreateComponent {
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
className: 'w-1/2 px-1'
}),
,
    				])

  ]

  constructor(
    private readonly store: WebContactMethodCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContactMethod(input) {
    this.store.createContactMethodEffect(input)
  }
}
