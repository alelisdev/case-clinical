

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDocumentSelectFormStore } from './web-document-select-form.store'

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-document-form
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [document]="context.value || {}"
      >
      </ui-document-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-document-table-view
        class="w-full h-full bg-white"
        [documents]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-document-table-view>
    </ng-template>
  `,
})
export class WebDocumentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl

  constructor(private store: WebDocumentSelectFormStore) {
    super()
    this.store.loadDocumentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.documents$.pipe(
      switchMap((documents) => {
        return of(documents)
      }),
    )
  }
}

