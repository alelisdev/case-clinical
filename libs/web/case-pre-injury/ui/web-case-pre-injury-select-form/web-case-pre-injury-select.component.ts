

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCasePreInjuryFeatureStore } from '@case-clinical/web/case-pre-injury/shared'
import {CasePreInjury} from '@case-clinical/web/core/data-access'


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
      <ui-case-pre-injury-form
        class="flex-grow flex flex-col"
        [formName]="'casePreInjury_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreInjury]="casePreInjury"
      >
      >
      </ui-case-pre-injury-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-pre-injury-form
        class="flex-grow flex flex-col"
        [formName]="'casePreInjury_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreInjury]="{}"
      >
      </ui-case-pre-injury-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-pre-injury-select-table-view
        class="w-full h-full bg-white"
        [casePreInjuries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-pre-injury-select-table-view>
    </ng-template>
  `,
})
export class WebCasePreInjurySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  casePreInjury: CasePreInjury

  constructor(private store: WebCasePreInjuryFeatureStore) {
    super()
    this.store.loadCasePreInjuriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.casePreInjuries$.pipe(
      switchMap((casePreInjuries) => {
        return of(casePreInjuries)
      }),
    )
  }
}

