

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCasePreAccidentFeatureStore } from '@case-clinical/web/case-pre-accident/shared'
import {CasePreAccident} from '@case-clinical/web/core/data-access'


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
      <ui-case-pre-accident-form
        class="flex-grow flex flex-col"
        [formName]="'casePreAccident_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreAccident]="casePreAccident"
      >
      >
      </ui-case-pre-accident-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-pre-accident-form
        class="flex-grow flex flex-col"
        [formName]="'casePreAccident_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreAccident]="{}"
      >
      </ui-case-pre-accident-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-pre-accident-select-table-view
        class="w-full h-full bg-white"
        [casePreAccidents]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-pre-accident-select-table-view>
    </ng-template>
  `,
})
export class WebCasePreAccidentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  casePreAccident: CasePreAccident

  constructor(private store: WebCasePreAccidentFeatureStore) {
    super()
    this.store.loadCasePreAccidentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.casePreAccidents$.pipe(
      switchMap((casePreAccidents) => {
        return of(casePreAccidents)
      }),
    )
  }
}

