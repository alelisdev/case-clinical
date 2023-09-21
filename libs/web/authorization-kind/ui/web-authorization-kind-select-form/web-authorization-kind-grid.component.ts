

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationKindFeatureStore } from '@case-clinical/web/authorization-kind/shared'
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
      <ui-authorization-kind-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationKind_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationKind]="context.value"
      >
      </ui-authorization-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-kind-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationKind_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationKind]="{}"
      >
      </ui-authorization-kind-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-authorization-kind-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [authorizationKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-authorization-kind-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationKindGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
