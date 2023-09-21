import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SettingsRoleStore } from './settings-role.store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'role-select',
  template: `
    <ui-form
      class="w-full"
      [fields]="fields"
      [model]="model"
      [options]="options"
    >
    </ui-form>
  `
})
export class RoleSelectComponent implements OnInit {
  @Output() roleDidSelect = new EventEmitter();

  roles$ = this._store.loadRoles();
  fields = [];

  model: any = {
  }
  options = {
    formState: {
      mainModel: this.model
    }
  }

  constructor(private _store: SettingsRoleStore,) {

  }

  ngOnInit(): void {
    this.roles$.subscribe(roles => {
      this.fields = [
        WebUiFormField.dropdown('role', {
          label: '',
          labelProp: 'name',
          valueProp: 'id',
          items: roles
        }, {
          className: 'w-full',
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(value => {
                this.roleDidSelect.emit(value)
              })
            }
          },
          placeHolder: 'Select role'
        })
      ]
    })
  }
}
