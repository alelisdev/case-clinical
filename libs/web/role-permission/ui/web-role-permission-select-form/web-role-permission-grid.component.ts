

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRolePermissionFeatureStore } from '@case-clinical/web/role-permission/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-role-permission-form
        class="flex-grow flex flex-col"
        [formName]="'rolePermission_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [rolePermission]="context.value"
      >
      </ui-role-permission-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-role-permission-form
        class="flex-grow flex flex-col"
        [formName]="'rolePermission_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [rolePermission]="{}"
      >
      </ui-role-permission-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-role-permission-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [rolePermissions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-role-permission-select-table-view>
    </ng-template>
  `,
})
export class WebRolePermissionGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
