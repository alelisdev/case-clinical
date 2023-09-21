

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCountryFeatureStore } from '@case-clinical/web/country/shared'
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
      <ui-country-form
        class="flex-grow flex flex-col"
        [formName]="'country_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [country]="context.value"
      >
      </ui-country-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-country-form
        class="flex-grow flex flex-col"
        [formName]="'country_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [country]="{}"
      >
      </ui-country-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-country-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [countries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-country-select-table-view>
    </ng-template>
  `,
})
export class WebCountryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
