
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FeaturePermission,Role } from '@case-clinical/web/core/data-access'
import { WebRoleFeaturePermissionCreateStore } from './web-role-feature-permission-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-role-feature-permission-create.component.html',
  providers: [WebRoleFeaturePermissionCreateStore],
})
export class WebRoleFeaturePermissionCreateComponent {
    readonly vm$ = this.store.vm$
    readonly featurePermissions$ = this.store.featurePermissions$
readonly roles$ = this.store.roles$

  model:any = {}

parentFeaturePermissionId: ''
parentRoleId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
})
    
  WebUiFormField.selectForm(
          'feature-permission',
          'featurePermissionId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('featurePermissionId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentFeaturePermissionId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

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
				])

  ]

  constructor(
    private readonly store: WebRoleFeaturePermissionCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRoleFeaturePermission(input) {

    if(this.parentFeaturePermissionId != ''){
      input = {...input, featurePermissionId: this.parentFeaturePermissionId} 
    }


    if(this.parentRoleId != ''){
      input = {...input, roleId: this.parentRoleId} 
    }


    this.store.createRoleFeaturePermissionEffect(input)
  }
}
