

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactKindFeatureStore } from '@case-clinical/web/contact-kind/shared'
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
      <ui-contact-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contactKind_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactKind]="context.value"
      >
      </ui-contact-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contactKind_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactKind]="{}"
      >
      </ui-contact-kind-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contact-kind-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contactKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contact-kind-select-table-view>
    </ng-template>
  `,
})
export class WebContactKindGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
