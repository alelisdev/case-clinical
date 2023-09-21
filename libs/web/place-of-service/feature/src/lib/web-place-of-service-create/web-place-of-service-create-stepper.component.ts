
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebPlaceOfServiceCreateStore } from './web-place-of-service-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-place-of-service-create.component.html',
  providers: [WebPlaceOfServiceCreateStore],
})
export class WebPlaceOfServiceCreateComponent {
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
WebUiFormField.checkbox('isFacility', { label: 'Is Facility' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
,

    				])

  ]

  constructor(
    private readonly store: WebPlaceOfServiceCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPlaceOfService(input) {


    this.store.createPlaceOfServiceEffect(input)
  }
}
