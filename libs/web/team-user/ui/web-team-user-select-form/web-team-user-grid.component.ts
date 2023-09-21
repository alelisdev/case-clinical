

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTeamUserFeatureStore } from '@case-clinical/web/team-user/shared'
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
      <ui-team-user-form
        class="flex-grow flex flex-col"
        [formName]="'teamUser_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamUser]="context.value"
      >
      </ui-team-user-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-team-user-form
        class="flex-grow flex flex-col"
        [formName]="'teamUser_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamUser]="{}"
      >
      </ui-team-user-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-team-user-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [teamUsers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-team-user-select-table-view>
    </ng-template>
  `,
})
export class WebTeamUserGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
