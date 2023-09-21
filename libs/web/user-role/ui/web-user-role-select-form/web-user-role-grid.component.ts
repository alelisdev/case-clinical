

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebUserRoleFeatureStore } from '@case-clinical/web/user-role/shared'
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
      <ui-user-role-form
        class="flex-grow flex flex-col"
        [formName]="'userRole_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [userRole]="context.value"
      >
      </ui-user-role-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-user-role-form
        class="flex-grow flex flex-col"
        [formName]="'userRole_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [userRole]="{}"
      >
      </ui-user-role-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-user-role-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [userRoles]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-user-role-select-table-view>
    </ng-template>
  `,
})
export class WebUserRoleGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
