
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateNotificationInput, User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebNotificationEditStore } from './web-notification-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-notification-edit.component.html',
  providers: [WebNotificationEditStore],
})
export class WebNotificationEditComponent {
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
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full  px-1'}),
WebUiFormField.input('description', { label: 'Description' }, {className: 'w-full  px-1'}),
WebUiFormField.input('type', { label: 'Type' }, {className: 'w-full  px-1'}),
WebUiFormField.input('icon', { label: 'Icon' }, {className: 'w-full  px-1'}),
WebUiFormField.input('image', { label: 'Image' }, {className: 'w-full  px-1'}),
WebUiFormField.input('link', { label: 'Link' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('useRouter', { label: 'Use Router' }, { className: 'w-1/4  p-3' }),
WebUiFormField.date('time', { label: 'Time' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('read', { label: 'Read' }, { className: 'w-1/4  p-3' }),
    
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
    private readonly store: WebNotificationEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateNotification(input: UserUpdateNotificationInput) {
     const { name,title,description,type,icon,image,link,useRouter,time,read,userId } = input
     this.store.updateNotificationEffect({ name,title,description,type,icon,image,link,useRouter,time,read,userId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
