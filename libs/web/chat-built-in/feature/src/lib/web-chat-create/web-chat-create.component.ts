
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { User } from '@case-clinical/web/core/data-access'
import { WebChatCreateStore } from './web-chat-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-chat-create.component.html',
  providers: [WebChatCreateStore],
})
export class WebChatCreateComponent {
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
WebUiFormField.number('unreadCount', { label: 'Unread Count' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('muted', { label: 'Muted' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('lastMessage', { label: 'Last Message' }, {className: 'w-full  px-1'}),
WebUiFormField.input('lastMessageAt', { label: 'Last Message At' }, {className: 'w-full  px-1'}),
    
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
    private readonly store: WebChatCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createChat(input) {
    this.store.createChatEffect(input)
  }
}
