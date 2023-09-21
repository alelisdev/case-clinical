

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactTagFeatureStore } from '@case-clinical/web/contact-tag/shared'
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
      <ui-contact-tag-form
        class="flex-grow flex flex-col"
        [formName]="'contactTag_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactTag]="context.value"
      >
      </ui-contact-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-tag-form
        class="flex-grow flex flex-col"
        [formName]="'contactTag_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactTag]="{}"
      >
      </ui-contact-tag-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contact-tag-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contactTags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contact-tag-select-table-view>
    </ng-template>
  `,
})
export class WebContactTagGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
