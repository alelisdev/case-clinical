
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebCalendarCreateStore } from './web-calendar-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-calendar-create.component.html',
  providers: [WebCalendarCreateStore],
})
export class WebCalendarCreateComponent {
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
WebUiFormField.input('color', { label: 'Color' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('visible', { label: 'Visible' }, { className: 'w-1/4  p-3' }),
,
,
    				])

  ]

  constructor(
    private readonly store: WebCalendarCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCalendar(input) {
    this.store.createCalendarEffect(input)
  }
}
