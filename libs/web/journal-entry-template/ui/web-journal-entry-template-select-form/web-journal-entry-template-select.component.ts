

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebJournalEntryTemplateFeatureStore } from '@case-clinical/web/journal-entry-template/shared'
import {JournalEntryTemplate} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-journal-entry-template-form
        class="flex-grow flex flex-col"
        [formName]="'journalEntryTemplate_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [journalEntryTemplate]="journalEntryTemplate"
      >
      >
      </ui-journal-entry-template-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-journal-entry-template-form
        class="flex-grow flex flex-col"
        [formName]="'journalEntryTemplate_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [journalEntryTemplate]="{}"
      >
      </ui-journal-entry-template-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-journal-entry-template-select-table-view
        class="w-full h-full bg-white"
        [journalEntryTemplates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-journal-entry-template-select-table-view>
    </ng-template>
  `,
    providers: [WebJournalEntryTemplateFeatureStore]
})
export class WebJournalEntryTemplateSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  journalEntryTemplate: JournalEntryTemplate

  constructor(private store: WebJournalEntryTemplateFeatureStore) {
    super()
    this.store.loadJournalEntryTemplatesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.journalEntryTemplates$.pipe(
      switchMap((journalEntryTemplates) => {
        return of(journalEntryTemplates)
      }),
    )
  }
}

