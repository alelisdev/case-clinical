
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebSurgicalPositionCreateStore } from './web-surgical-position-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-surgical-position-create.component.html',
  providers: [WebSurgicalPositionCreateStore],
})
export class WebSurgicalPositionCreateComponent {
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
    private readonly store: WebSurgicalPositionCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createSurgicalPosition(input) {


    this.store.createSurgicalPositionEffect(input)
  }
}
