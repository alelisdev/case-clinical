
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateContactMethodInput, Role  } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebContactMethodEditStore } from './web-contact-method-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-method-edit.component.html',
  providers: [WebContactMethodEditStore],
})
export class WebContactMethodEditComponent {
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
    private readonly store: WebContactMethodEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateContactMethod(input: UserUpdateContactMethodInput) {
     const { name } = input
     this.store.updateContactMethodEffect({ name })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
