

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRequestAdditionalVisitFeatureStore } from '@case-clinical/web/request-additional-visit/shared'
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
      <ui-request-additional-visit-form
        class="flex-grow flex flex-col"
        [formName]="'requestAdditionalVisit_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [requestAdditionalVisit]="context.value"
      >
      </ui-request-additional-visit-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-request-additional-visit-form
        class="flex-grow flex flex-col"
        [formName]="'requestAdditionalVisit_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [requestAdditionalVisit]="{}"
      >
      </ui-request-additional-visit-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-request-additional-visit-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [requestAdditionalVisits]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-request-additional-visit-select-table-view>
    </ng-template>
  `,
})
export class WebRequestAdditionalVisitGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
