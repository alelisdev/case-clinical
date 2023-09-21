

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthDmeFeatureStore } from '@case-clinical/web/prior-auth-dme/shared'
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
      <ui-prior-auth-dme-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthDme_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthDme]="context.value"
      >
      </ui-prior-auth-dme-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-auth-dme-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthDme_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthDme]="{}"
      >
      </ui-prior-auth-dme-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-auth-dme-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthDmes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-auth-dme-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthDmeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}