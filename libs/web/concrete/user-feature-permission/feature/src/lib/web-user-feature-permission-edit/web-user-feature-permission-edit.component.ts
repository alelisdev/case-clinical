
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateUserFeaturePermissionInput, FeaturePermission,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebUserFeaturePermissionEditStore } from './web-user-feature-permission-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-user-feature-permission-edit.component.html',
  providers: [WebUserFeaturePermissionEditStore],
})
export class WebUserFeaturePermissionEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
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
}),
    
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

  WebUiFormField.select(
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
    private readonly store: WebUserFeaturePermissionEditStore,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  updateUserFeaturePermission(input: UserUpdateUserFeaturePermissionInput) {
     const { name,featurePermissionId,userId } = input
     this.store.updateUserFeaturePermissionEffect({ name,featurePermissionId,userId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
