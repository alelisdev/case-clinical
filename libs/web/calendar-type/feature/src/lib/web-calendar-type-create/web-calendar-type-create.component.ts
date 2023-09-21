
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebCalendarTypeCreateStore } from './web-calendar-type-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-calendar-type-create.component.html',
  providers: [WebCalendarTypeCreateStore],
})
export class WebCalendarTypeCreateComponent {
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
    private readonly store: WebCalendarTypeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCalendarType(input) {
    this.store.createCalendarTypeEffect(input)
  }
}
