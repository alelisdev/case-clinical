

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCasePreProblemFeatureStore } from '@case-clinical/web/case-pre-problem/shared'
import {CasePreProblem} from '@case-clinical/web/core/data-access'


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
      <ui-case-pre-problem-form
        class="flex-grow flex flex-col"
        [formName]="'casePreProblem_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreProblem]="casePreProblem"
      >
      >
      </ui-case-pre-problem-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-pre-problem-form
        class="flex-grow flex flex-col"
        [formName]="'casePreProblem_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreProblem]="{}"
      >
      </ui-case-pre-problem-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-pre-problem-select-table-view
        class="w-full h-full bg-white"
        [casePreProblems]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-pre-problem-select-table-view>
    </ng-template>
  `,
})
export class WebCasePreProblemSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  casePreProblem: CasePreProblem

  constructor(private store: WebCasePreProblemFeatureStore) {
    super()
    this.store.loadCasePreProblemsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.casePreProblems$.pipe(
      switchMap((casePreProblems) => {
        return of(casePreProblems)
      }),
    )
  }
}

