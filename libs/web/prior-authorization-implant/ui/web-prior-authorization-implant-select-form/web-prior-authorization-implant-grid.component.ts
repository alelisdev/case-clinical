

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationImplantFeatureStore } from '@case-clinical/web/prior-authorization-implant/shared'
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
      <ui-prior-authorization-implant-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationImplant_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationImplant]="context.value"
      >
      </ui-prior-authorization-implant-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-implant-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationImplant_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationImplant]="{}"
      >
      </ui-prior-authorization-implant-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-implant-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthorizationImplants]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-authorization-implant-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationImplantGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
