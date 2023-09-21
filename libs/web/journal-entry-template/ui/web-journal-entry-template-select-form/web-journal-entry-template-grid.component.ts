

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebJournalEntryTemplateFeatureStore } from '@case-clinical/web/journal-entry-template/shared'
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
      <ui-journal-entry-template-form
        class="flex-grow flex flex-col"
        [formName]="'journalEntryTemplate_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [journalEntryTemplate]="context.value"
      >
      </ui-journal-entry-template-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-journal-entry-template-form
        class="flex-grow flex flex-col"
        [formName]="'journalEntryTemplate_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [journalEntryTemplate]="{}"
      >
      </ui-journal-entry-template-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-journal-entry-template-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [journalEntryTemplates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-journal-entry-template-select-table-view>
    </ng-template>
  `,
})
export class WebJournalEntryTemplateGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
