
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateCalendarWeekdayInput, Role  } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebCalendarWeekdayEditStore } from './web-calendar-weekday-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-calendar-weekday-edit.component.html',
  providers: [WebCalendarWeekdayEditStore],
})
export class WebCalendarWeekdayEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        

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
    private readonly store: WebCalendarWeekdayEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateCalendarWeekday(input: UserUpdateCalendarWeekdayInput) {
     const { name,abbr,label,value } = input
     this.store.updateCalendarWeekdayEffect({ name,abbr,label,value })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
