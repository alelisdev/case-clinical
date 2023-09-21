

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'
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
      <ui-med-level-form
        class="flex-grow flex flex-col"
        [formName]="'medLevel_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medLevel]="context.value"
      >
      </ui-med-level-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-med-level-form
        class="flex-grow flex flex-col"
        [formName]="'medLevel_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medLevel]="{}"
      >
      </ui-med-level-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-med-level-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [medLevels]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-med-level-select-table-view>
    </ng-template>
  `,
})
export class WebMedLevelGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
