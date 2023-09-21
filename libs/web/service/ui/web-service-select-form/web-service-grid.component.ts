

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebServiceFeatureStore } from '@case-clinical/web/service/shared'
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
      <ui-service-form
        class="flex-grow flex flex-col"
        [formName]="'service_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [service]="context.value"
      >
      </ui-service-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-service-form
        class="flex-grow flex flex-col"
        [formName]="'service_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [service]="{}"
      >
      </ui-service-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-service-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [services]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-service-select-table-view>
    </ng-template>
  `,
})
export class WebServiceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
