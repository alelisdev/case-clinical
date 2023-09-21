
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebTeamUserFormStore } from './web-team-user-form.store'
import { TeamUser,TeamRole } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-team-user-form',
  providers: [WebTeamUserFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(teamUser))" [model]="teamUser ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiTeamUserComponent
    {
  @Input() teamUser: TeamUser = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentTeamRoleId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'team-role',
          'teamRoleId',
        {
          defaultValues: {}, ////Set Parent Values
          createTeamRole: (event) => {
            if(event?.name) {
              this.store.addTeamRole(event)
              this.model.teamRoleId = event.id
              this.form.controls['teamRoleId'].patchValue(event.id)
              this.form.controls['teamRoleId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterTeamRoles('').subscribe((values) => {
              this.model.teamRoleId = selected?.id
              this.form.controls['teamRoleId'].patchValue(selected?.id)
              this.form.controls['teamRoleId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Team Role',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterTeamRoles,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterTeamRoles('').subscribe()
              this.route.params.pipe(pluck('teamRoleId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTeamRoleId = s
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
}),
WebUiFormField.input('teamId', { label: 'Team Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('userId', { label: 'User Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true})				])

]

  constructor(
    private readonly store: WebTeamUserFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,teamId,userId,teamRoleId }) {
    
    if(this.parentTeamRoleId != ''){
      teamRoleId = this.parentTeamRoleId
    }

    await this.store.createTeamUserEffect({ name,teamId,userId,teamRoleId })

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
