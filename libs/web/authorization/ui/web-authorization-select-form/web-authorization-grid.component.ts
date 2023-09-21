

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'authorization_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorization]="context.value"
      >
      </ui-authorization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'authorization_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorization]="{}"
      >
      </ui-authorization-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-authorization-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [authorizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-authorization-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
