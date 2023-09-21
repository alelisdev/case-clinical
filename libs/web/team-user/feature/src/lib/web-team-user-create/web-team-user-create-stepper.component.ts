
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Team,User,TeamRole } from '@case-clinical/web/core/data-access'
import { WebTeamUserCreateStore } from './web-team-user-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-team-user-create.component.html',
  providers: [WebTeamUserCreateStore],
})
export class WebTeamUserCreateComponent {
    readonly vm$ = this.store.vm$
    readonly teams$ = this.store.teams$
readonly users$ = this.store.users$
readonly teamRoles$ = this.store.teamRoles$

  model:any = {}

parentTeamId: ''
parentUserId: ''
parentTeamRoleId: ''

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
          'team',
          'teamId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('teamId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTeamId = s
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
,

  WebUiFormField.selectForm(
          'team-role',
          'teamRoleId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebTeamUserCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createTeamUser(input) {

    if(this.parentTeamId != ''){
      input = {...input, teamId: this.parentTeamId} 
    }


    if(this.parentUserId != ''){
      input = {...input, userId: this.parentUserId} 
    }


    if(this.parentTeamRoleId != ''){
      input = {...input, teamRoleId: this.parentTeamRoleId} 
    }


    this.store.createTeamUserEffect(input)
  }
}
