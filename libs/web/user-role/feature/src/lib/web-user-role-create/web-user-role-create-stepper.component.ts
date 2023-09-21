
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Role,User } from '@case-clinical/web/core/data-access'
import { WebUserRoleCreateStore } from './web-user-role-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-user-role-create.component.html',
  providers: [WebUserRoleCreateStore],
})
export class WebUserRoleCreateComponent {
    readonly vm$ = this.store.vm$
    readonly roles$ = this.store.roles$
readonly users$ = this.store.users$

  model:any = {}

parentRoleId: ''
parentUserId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
})
    
  WebUiFormField.selectForm(
          'role',
          'roleId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('roleId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentRoleId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'user',
          'userId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('userId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentUserId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
				])

  ]

  constructor(
    private readonly store: WebUserRoleCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createUserRole(input) {

    if(this.parentRoleId != ''){
      input = {...input, roleId: this.parentRoleId} 
    }


    if(this.parentUserId != ''){
      input = {...input, userId: this.parentUserId} 
    }


    this.store.createUserRoleEffect(input)
  }
}
