

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTeamFeatureStore } from '@case-clinical/web/team/shared'
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
      <ui-team-form
        class="flex-grow flex flex-col"
        [formName]="'team_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [team]="context.value"
      >
      </ui-team-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-team-form
        class="flex-grow flex flex-col"
        [formName]="'team_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [team]="{}"
      >
      </ui-team-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-team-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [teams]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-team-select-table-view>
    </ng-template>
  `,
})
export class WebTeamGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
