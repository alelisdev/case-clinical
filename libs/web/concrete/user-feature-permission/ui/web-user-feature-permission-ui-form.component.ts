
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebUserFeaturePermissionFormStore } from './web-user-feature-permission-form.store'
import { UserFeaturePermission,FeaturePermission,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-user-feature-permission-form',
  providers: [WebUserFeaturePermissionFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(userFeaturePermission))" [model]="userFeaturePermission ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiUserFeaturePermissionComponent
    {
  @Input() userFeaturePermission: UserFeaturePermission = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4 px-1'
})				])

]

  constructor(
    private readonly store: WebUserFeaturePermissionFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,featurePermissionId,userId }) {
    await this.store.createUserFeaturePermissionEffect({ name,featurePermissionId,userId })

    await this.store.item$.pipe(
      tap((item) => {
        if(item) {
          this.send.emit(item)
        }
      })
    ).subscribe()
  }

  handleDiscardClick(event) { 
     this.send.emit(event)
  }
}
