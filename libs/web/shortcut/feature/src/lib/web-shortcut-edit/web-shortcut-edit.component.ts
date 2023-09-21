
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateShortcutInput, User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebShortcutEditStore } from './web-shortcut-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-shortcut-edit.component.html',
  providers: [WebShortcutEditStore],
})
export class WebShortcutEditComponent {
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
WebUiFormField.input('label', { label: 'Label' }, {className: 'w-full  px-1'}),
WebUiFormField.input('description', { label: 'Description' }, {className: 'w-full  px-1'}),
WebUiFormField.input('icon', { label: 'Icon' }, {className: 'w-full  px-1'}),
WebUiFormField.input('link', { label: 'Link' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('useRouter', { label: 'Use Router' }, { className: 'w-1/4  p-3' }),
    
  WebUiFormField.select(
          'userId',
          {
            label: 'User',
            options: this.store
                .filterUsers('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('userId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.userId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
				])
    
  ]

    

  constructor(
    private readonly store: WebShortcutEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateShortcut(input: UserUpdateShortcutInput) {
     const { name,label,description,icon,link,useRouter,userId } = input
     this.store.updateShortcutEffect({ name,label,description,icon,link,useRouter,userId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
