

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationStatusFeatureStore } from '@case-clinical/web/authorization-status/shared'
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
      <ui-authorization-status-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationStatus]="context.value"
      >
      </ui-authorization-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-status-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationStatus]="{}"
      >
      </ui-authorization-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-authorization-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [authorizationStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-authorization-status-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
