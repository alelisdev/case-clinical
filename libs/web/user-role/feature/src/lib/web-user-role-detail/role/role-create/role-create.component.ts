
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { RoleCreateStore } from './role-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { UserCreateRoleInput } from '@case-clinical/web/core/data-access'
import { pluck } from 'rxjs/operators'
import { FormlyFieldConfig } from '@ngx-formly/core'


@Component({
  templateUrl: './role-create.component.html',
  providers: [RoleCreateStore],
})
export class RoleCreateComponent {
        readonly vm$ = this.store.vm$
        

  model: UserCreateRoleInput = {}

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
    private readonly store: RoleCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.setCurrentlySelectedUserRole()
}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRole(input) {
    this.store.createRoleEffect(input)
  }

  setCurrentlySelectedUserRole() {
    this.route.params.pipe(pluck('userRoleId')).subscribe(s => this.model.userRoleId = s)
  }
}
