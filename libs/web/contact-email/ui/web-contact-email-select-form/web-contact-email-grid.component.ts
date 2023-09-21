

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactEmailFeatureStore } from '@case-clinical/web/contact-email/shared'
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
      <ui-contact-email-form
        class="flex-grow flex flex-col"
        [formName]="'contactEmail_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactEmail]="context.value"
      >
      </ui-contact-email-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-email-form
        class="flex-grow flex flex-col"
        [formName]="'contactEmail_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactEmail]="{}"
      >
      </ui-contact-email-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contact-email-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contactEmails]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contact-email-select-table-view>
    </ng-template>
  `,
})
export class WebContactEmailGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
