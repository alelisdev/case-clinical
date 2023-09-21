
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateEmailInput, Role ,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebEmailEditStore } from './web-email-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-email-edit.component.html',
  providers: [WebEmailEditStore],
})
export class WebEmailEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        readonly users$ = this.store.users$

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
WebUiFormField.input('email', { label: 'Email' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('isPublic', { label: 'Is Public' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('primary', { label: 'Primary' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('verified', { label: 'Verified' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('verifyToken', { label: 'Verify Token' }, {className: 'w-full  px-1'}),
WebUiFormField.date('verifyExpires', { label: 'Verify Expires' }, {className: 'w-full  px-1'}),
    
  WebUiFormField.select(
          'ownerId',
          {
            label: 'Owner',
            options: [{id: 'CREATE', name: 'Create New Owner'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterUsers('').pipe(
                  map((x:User)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
				])

  ]

  constructor(
    private readonly store: WebEmailEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateEmail(input: UserUpdateEmailInput) {
     const { name,email,isPublic,primary,verified,verifyToken,verifyExpires,ownerId } = input
     this.store.updateEmailEffect({ name,email,isPublic,primary,verified,verifyToken,verifyExpires,ownerId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
