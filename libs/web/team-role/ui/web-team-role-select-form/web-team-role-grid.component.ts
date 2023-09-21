

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTeamRoleFeatureStore } from '@case-clinical/web/team-role/shared'
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
      <ui-team-role-form
        class="flex-grow flex flex-col"
        [formName]="'teamRole_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamRole]="context.value"
      >
      </ui-team-role-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-team-role-form
        class="flex-grow flex flex-col"
        [formName]="'teamRole_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamRole]="{}"
      >
      </ui-team-role-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-team-role-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [teamRoles]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-team-role-select-table-view>
    </ng-template>
  `,
})
export class WebTeamRoleGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
