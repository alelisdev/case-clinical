
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateCalendarTypeInput, Role  } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebCalendarTypeEditStore } from './web-calendar-type-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-calendar-type-edit.component.html',
  providers: [WebCalendarTypeEditStore],
})
export class WebCalendarTypeEditComponent {
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
,
    				])

  ]

  constructor(
    private readonly store: WebCalendarTypeEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateCalendarType(input: UserUpdateCalendarTypeInput) {
     const { name } = input
     this.store.updateCalendarTypeEffect({ name })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
