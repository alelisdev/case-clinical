
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebCalendarWeekdayCreateStore } from './web-calendar-weekday-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-calendar-weekday-create.component.html',
  providers: [WebCalendarWeekdayCreateStore],
})
export class WebCalendarWeekdayCreateComponent {
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
WebUiFormField.input('abbr', { label: 'Abbr' }, {className: 'w-full  px-1'}),
WebUiFormField.input('label', { label: 'Label' }, {className: 'w-full  px-1'}),
WebUiFormField.input('value', { label: 'Value' }, {className: 'w-full  px-1'}),
    				])

  ]

  constructor(
    private readonly store: WebCalendarWeekdayCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCalendarWeekday(input) {
    this.store.createCalendarWeekdayEffect(input)
  }
}
