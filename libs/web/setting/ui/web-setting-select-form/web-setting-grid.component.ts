

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebSettingFeatureStore } from '@case-clinical/web/setting/shared'
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
      <ui-setting-form
        class="flex-grow flex flex-col"
        [formName]="'setting_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [setting]="context.value"
      >
      </ui-setting-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-setting-form
        class="flex-grow flex flex-col"
        [formName]="'setting_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [setting]="{}"
      >
      </ui-setting-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-setting-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [settings]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-setting-select-table-view>
    </ng-template>
  `,
})
export class WebSettingGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
