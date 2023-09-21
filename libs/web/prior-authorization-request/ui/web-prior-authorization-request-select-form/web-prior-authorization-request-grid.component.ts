

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
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
      <ui-prior-authorization-request-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationRequest_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationRequest]="context.value"
      >
      </ui-prior-authorization-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-request-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationRequest_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationRequest]="{}"
      >
      </ui-prior-authorization-request-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-request-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthorizationRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-authorization-request-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationRequestGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
