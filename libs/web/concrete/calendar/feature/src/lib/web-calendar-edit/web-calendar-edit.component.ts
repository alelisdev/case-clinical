
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateCalendarInput, Role  } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebCalendarEditStore } from './web-calendar-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-calendar-edit.component.html',
  providers: [WebCalendarEditStore],
})
export class WebCalendarEditComponent {
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
WebUiFormField.input('color', { label: 'Color' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('visible', { label: 'Visible' }, { className: 'w-1/4  p-3' }),
,
,
    				])

  ]

  constructor(
    private readonly store: WebCalendarEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateCalendar(input: UserUpdateCalendarInput) {
     const { name,color,visible } = input
     this.store.updateCalendarEffect({ name,color,visible })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
