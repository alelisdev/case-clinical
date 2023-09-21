

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPortfolioFeatureStore } from '@case-clinical/web/portfolio/shared'
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
      <ui-portfolio-form
        class="flex-grow flex flex-col"
        [formName]="'portfolio_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [portfolio]="context.value"
      >
      </ui-portfolio-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-portfolio-form
        class="flex-grow flex flex-col"
        [formName]="'portfolio_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [portfolio]="{}"
      >
      </ui-portfolio-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-portfolio-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [portfolios]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-portfolio-select-table-view>
    </ng-template>
  `,
})
export class WebPortfolioGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
