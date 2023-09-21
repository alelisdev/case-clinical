
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateChatInput, User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebChatEditStore } from './web-chat-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-chat-edit.component.html',
  providers: [WebChatEditStore],
})
export class WebChatEditComponent {
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
WebUiFormField.number('unreadCount', { label: 'Unread Count' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('muted', { label: 'Muted' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('lastMessage', { label: 'Last Message' }, {className: 'w-full  px-1'}),
WebUiFormField.input('lastMessageAt', { label: 'Last Message At' }, {className: 'w-full  px-1'}),
,
    
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
    private readonly store: WebChatEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateChat(input: UserUpdateChatInput) {
     const { name,userId,unreadCount,muted,lastMessage,lastMessageAt } = input
     this.store.updateChatEffect({ name,userId,unreadCount,muted,lastMessage,lastMessageAt })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
