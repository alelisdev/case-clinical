
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Permission } from '@case-clinical/web/core/data-access'
import { WebRolePermissionCreateStore } from './web-role-permission-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-role-permission-create.component.html',
  providers: [WebRolePermissionCreateStore],
})
export class WebRolePermissionCreateComponent {
    readonly vm$ = this.store.vm$
    readonly permissions$ = this.store.permissions$

  model:any = {}

parentPermissionId: ''

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
}),
WebUiFormField.input('roleId', { label: 'Role Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true})
    
  WebUiFormField.selectForm(
          'permission',
          'permissionId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('permissionId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPermissionId = s
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
    private readonly store: WebRolePermissionCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRolePermission(input) {

    if(this.parentPermissionId != ''){
      input = {...input, permissionId: this.parentPermissionId} 
    }


    this.store.createRolePermissionEffect(input)
  }
}
