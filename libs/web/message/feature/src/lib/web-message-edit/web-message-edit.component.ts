
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateMessageInput, User,Chat } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebMessageEditStore } from './web-message-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-message-edit.component.html',
  providers: [WebMessageEditStore],
})
export class WebMessageEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        readonly users$ = this.store.users$
readonly chats$ = this.store.chats$

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
WebUiFormField.input('image', { label: 'Image' }, {className: 'w-full  px-1'}),
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full  px-1'}),
WebUiFormField.input('description', { label: 'Description' }, {className: 'w-full  px-1'}),
WebUiFormField.date('time', { label: 'Time' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('read', { label: 'Read' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('isMine', { label: 'Is Mine' }, { className: 'w-1/4  p-3' }),
    
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
,

  WebUiFormField.select(
          'chatId',
          {
            label: 'Chat',
            options: this.store
                .filterChats('')
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
                this.route.params.pipe(pluck('chatId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.chatId = s
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
    private readonly store: WebMessageEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateMessage(input: UserUpdateMessageInput) {
     const { name,image,title,description,time,read,isMine,userId,chatId } = input
     this.store.updateMessageEffect({ name,image,title,description,time,read,isMine,userId,chatId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
