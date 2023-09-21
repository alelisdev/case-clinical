
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FeaturePermission,User } from '@case-clinical/web/core/data-access'
import { WebUserFeaturePermissionCreateStore } from './web-user-feature-permission-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-user-feature-permission-create.component.html',
  providers: [WebUserFeaturePermissionCreateStore],
})
export class WebUserFeaturePermissionCreateComponent {
    readonly vm$ = this.store.vm$
    readonly featurePermissions$ = this.store.featurePermissions$
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
className: 'w-full sm:w-1/2 md:w-1/4 px-1'
})
    
  WebUiFormField.selectForm(
          'feature-permission',
          'featurePermissionId',
        {
          defaultValues: {}, ////Set Parent Values
          className: 'sm:w-full md:w-1/4 px-1',
          createFeaturePermission: (event) => {
            if(event?.name) {
              this.store.addFeaturePermission(event)
              this.model.featurePermissionId = event.id
              this.form.controls['featurePermissionId'].patchValue(event.id)
              this.form.controls['featurePermissionId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          label: 'Feature Permission',
          options: this.store.featurePermissions$,
          valueProp: 'id',
          labelProp: 'name'
        },
        {
          hooks: {
            onInit: async (field) => {
              this.store.filterFeaturePermissions('').subscribe()
              this.route.params.pipe(pluck('featurePermissionId')).subscribe((s) => {
              field.formControl?.setValue(s)
              this.model.featurePermissionId = s
              if (s != undefined || s != null) {
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
          className: 'sm:w-full md:w-1/4 px-1',
          createUser: (event) => {
            if(event?.name) {
              this.store.addUser(event)
              this.model.userId = event.id
              this.form.controls['userId'].patchValue(event.id)
              this.form.controls['userId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          label: 'User',
          options: this.store.users$,
          valueProp: 'id',
          labelProp: 'name'
        },
        {
          hooks: {
            onInit: async (field) => {
              this.store.filterUsers('').subscribe()
              this.route.params.pipe(pluck('userId')).subscribe((s) => {
              field.formControl?.setValue(s)
              this.model.userId = s
              if (s != undefined || s != null) {
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
    private readonly store: WebUserFeaturePermissionCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createUserFeaturePermission(input) {
    this.store.createUserFeaturePermissionEffect(input)
  }
}
