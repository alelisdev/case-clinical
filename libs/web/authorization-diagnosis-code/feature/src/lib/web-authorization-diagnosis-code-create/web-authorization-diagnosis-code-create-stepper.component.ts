
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { DiagnosisCode,Authorization } from '@case-clinical/web/core/data-access'
import { WebAuthorizationDiagnosisCodeCreateStore } from './web-authorization-diagnosis-code-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-authorization-diagnosis-code-create.component.html',
  providers: [WebAuthorizationDiagnosisCodeCreateStore],
})
export class WebAuthorizationDiagnosisCodeCreateComponent {
    readonly vm$ = this.store.vm$
    readonly diagnosisCodes$ = this.store.diagnosisCodes$
readonly authorizations$ = this.store.authorizations$

  model:any = {}

parentDiagnosisCodeId: ''
parentAuthorizationId: ''

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
          'diagnosis-code',
          'diagnosisCodeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('diagnosisCodeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentDiagnosisCodeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'authorization',
          'authorizationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('authorizationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAuthorizationId = s
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
    private readonly store: WebAuthorizationDiagnosisCodeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createAuthorizationDiagnosisCode(input) {

    if(this.parentDiagnosisCodeId != ''){
      input = {...input, diagnosisCodeId: this.parentDiagnosisCodeId} 
    }


    if(this.parentAuthorizationId != ''){
      input = {...input, authorizationId: this.parentAuthorizationId} 
    }


    this.store.createAuthorizationDiagnosisCodeEffect(input)
  }
}
