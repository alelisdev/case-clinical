
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { User } from '@case-clinical/web/core/data-access'
import { WebEmailCreateStore } from './web-email-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-email-create.component.html',
  providers: [WebEmailCreateStore],
})
export class WebEmailCreateComponent {
    readonly vm$ = this.store.vm$
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
    private readonly store: WebEmailCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createEmail(input) {
    this.store.createEmailEffect(input)
  }
}
