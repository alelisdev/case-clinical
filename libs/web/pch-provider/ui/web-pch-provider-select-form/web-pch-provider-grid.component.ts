

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPchProviderFeatureStore } from '@case-clinical/web/pch-provider/shared'
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
      <ui-pch-provider-form
        class="flex-grow flex flex-col"
        [formName]="'pchProvider_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [pchProvider]="context.value"
      >
      </ui-pch-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-pch-provider-form
        class="flex-grow flex flex-col"
        [formName]="'pchProvider_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [pchProvider]="{}"
      >
      </ui-pch-provider-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-pch-provider-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [pchProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-pch-provider-select-table-view>
    </ng-template>
  `,
})
export class WebPchProviderGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
