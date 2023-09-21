

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRoleFeatureStore } from '@case-clinical/web/role/shared'
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
      <ui-role-form
        class="flex-grow flex flex-col"
        [formName]="'role_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [role]="context.value"
      >
      </ui-role-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-role-form
        class="flex-grow flex flex-col"
        [formName]="'role_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [role]="{}"
      >
      </ui-role-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-role-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [roles]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-role-select-table-view>
    </ng-template>
  `,
})
export class WebRoleGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
