
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebUserRoleFormStore } from './web-user-role-form.store'
import { UserRole,Role,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-user-role-form',
  providers: [WebUserRoleFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(userRole))" [model]="userRole ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiUserRoleComponent
    {
  @Input() userRole: UserRole = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentRoleId: ''
parentUserId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'role',
          'roleId',
        {
          defaultValues: {}, ////Set Parent Values
          createRole: (event) => {
            if(event?.name) {
              this.store.addRole(event)
              this.model.roleId = event.id
              this.form.controls['roleId'].patchValue(event.id)
              this.form.controls['roleId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterRoles('').subscribe((values) => {
              this.model.roleId = selected?.id
              this.form.controls['roleId'].patchValue(selected?.id)
              this.form.controls['roleId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Role',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterRoles,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterRoles('').subscribe()
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
          onChange: (selected) => {
            this.store.filterUsers('').subscribe((values) => {
              this.model.userId = selected?.id
              this.form.controls['userId'].patchValue(selected?.id)
              this.form.controls['userId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'User',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterUsers,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterUsers('').subscribe()
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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
})				])

]

  constructor(
    private readonly store: WebUserRoleFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,roleId,userId }) {
    
    if(this.parentRoleId != ''){
      roleId = this.parentRoleId
    }


    if(this.parentUserId != ''){
      userId = this.parentUserId
    }

    await this.store.createUserRoleEffect({ name,roleId,userId })

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
