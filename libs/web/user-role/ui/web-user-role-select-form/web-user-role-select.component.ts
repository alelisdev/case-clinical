

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebUserRoleFeatureStore } from '@case-clinical/web/user-role/shared'
import {UserRole} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-user-role-form
        class="flex-grow flex flex-col"
        [formName]="'userRole_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [userRole]="userRole"
      >
      >
      </ui-user-role-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-user-role-form
        class="flex-grow flex flex-col"
        [formName]="'userRole_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [userRole]="{}"
      >
      </ui-user-role-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-user-role-select-table-view
        class="w-full h-full bg-white"
        [userRoles]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-user-role-select-table-view>
    </ng-template>
  `,
})
export class WebUserRoleSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  userRole: UserRole

  constructor(private store: WebUserRoleFeatureStore) {
    super()
    this.store.loadUserRolesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.userRoles$.pipe(
      switchMap((userRoles) => {
        return of(userRoles)
      }),
    )
  }
}

