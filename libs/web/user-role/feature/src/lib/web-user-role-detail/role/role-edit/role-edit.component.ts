
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateRoleInput, Role } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { RoleEditStore } from './role-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  templateUrl: './role-edit.component.html',
  providers: [RoleEditStore],
})
export class RoleEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        

  model: UserUpdateRoleInput  = {}

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1',
  hideExpression: (model: any, formState: any, field: FormlyFieldConfig) => {
    // access to the main model can be through `this.model` or `formState` or `model
    if (formState.mainModel && formState.mainModel?.name) {
      return formState.mainModel.name !== "123"
    }
    return true;
  },
 expressionProperties: {
  'templateOptions.disabled': (model: any, formState: any, field: FormlyFieldConfig) => {
    // access to the main model can be through `this.model` or `formState` or `model
    return !formState.mainModel.name
  }
}
})				])
,
    
  ]

  constructor(
    private readonly store: RoleEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateRole(input: UserUpdateRoleInput) {
     const { name,  } = input
        
          

     this.store.updateRoleEffect({name})
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
