

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationTypeFeatureStore } from '@case-clinical/web/authorization-type/shared'
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
      <ui-authorization-type-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationType]="context.value"
      >
      </ui-authorization-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-type-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationType]="{}"
      >
      </ui-authorization-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-authorization-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [authorizationTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-authorization-type-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
