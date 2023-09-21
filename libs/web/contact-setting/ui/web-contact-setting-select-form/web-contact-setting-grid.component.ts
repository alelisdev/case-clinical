

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactSettingFeatureStore } from '@case-clinical/web/contact-setting/shared'
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
      <ui-contact-setting-form
        class="flex-grow flex flex-col"
        [formName]="'contactSetting_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactSetting]="context.value"
      >
      </ui-contact-setting-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-setting-form
        class="flex-grow flex flex-col"
        [formName]="'contactSetting_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactSetting]="{}"
      >
      </ui-contact-setting-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contact-setting-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contactSettings]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contact-setting-select-table-view>
    </ng-template>
  `,
})
export class WebContactSettingGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
