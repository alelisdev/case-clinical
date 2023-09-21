

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactPhoneNumberFeatureStore } from '@case-clinical/web/contact-phone-number/shared'
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
      <ui-contact-phone-number-form
        class="flex-grow flex flex-col"
        [formName]="'contactPhoneNumber_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactPhoneNumber]="context.value"
      >
      </ui-contact-phone-number-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-phone-number-form
        class="flex-grow flex flex-col"
        [formName]="'contactPhoneNumber_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactPhoneNumber]="{}"
      >
      </ui-contact-phone-number-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contact-phone-number-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contactPhoneNumbers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contact-phone-number-select-table-view>
    </ng-template>
  `,
})
export class WebContactPhoneNumberGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
