

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDocumentTypeFeatureStore } from '@case-clinical/web/document-type/shared'
import {DocumentType} from '@case-clinical/web/core/data-access'


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
      <ui-document-type-form
        class="flex-grow flex flex-col"
        [formName]="'documentType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [documentType]="documentType"
      >
      >
      </ui-document-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-document-type-form
        class="flex-grow flex flex-col"
        [formName]="'documentType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [documentType]="{}"
      >
      </ui-document-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-document-type-select-table-view
        class="w-full h-full bg-white"
        [documentTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-document-type-select-table-view>
    </ng-template>
  `,
})
export class WebDocumentTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  documentType: DocumentType

  constructor(private store: WebDocumentTypeFeatureStore) {
    super()
    this.store.loadDocumentTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.documentTypes$.pipe(
      switchMap((documentTypes) => {
        return of(documentTypes)
      }),
    )
  }
}

