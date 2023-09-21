

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebJournalEntryFeatureStore } from '@case-clinical/web/journal-entry/shared'
import {JournalEntry} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-journal-entry-form
        class="flex-grow flex flex-col"
        [formName]="'journalEntry_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [journalEntry]="journalEntry"
      >
      >
      </ui-journal-entry-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-journal-entry-form
        class="flex-grow flex flex-col"
        [formName]="'journalEntry_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [journalEntry]="{}"
      >
      </ui-journal-entry-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-journal-entry-select-table-view
        class="w-full h-full bg-white"
        [journalEntries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-journal-entry-select-table-view>
    </ng-template>
  `,
})
export class WebJournalEntrySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  journalEntry: JournalEntry

  constructor(private store: WebJournalEntryFeatureStore) {
    super()
    this.store.loadJournalEntriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.journalEntries$.pipe(
      switchMap((journalEntries) => {
        return of(journalEntries)
      }),
    )
  }
}

