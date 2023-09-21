

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared'
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
      <ui-review-form
        class="flex-grow flex flex-col"
        [formName]="'review_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [review]="context.value"
      >
      </ui-review-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-review-form
        class="flex-grow flex flex-col"
        [formName]="'review_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [review]="{}"
      >
      </ui-review-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-review-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [reviews]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-review-select-table-view>
    </ng-template>
  `,
})
export class WebReviewGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
