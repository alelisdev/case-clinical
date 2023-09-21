

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import {CaseAccount} from '@case-clinical/web/core/data-access'


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
      <ui-case-account-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccount_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccount]="caseAccount"
      >
      >
      </ui-case-account-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-account-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccount_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccount]="{}"
      >
      </ui-case-account-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-account-select-table-view
        class="w-full h-full bg-white"
        [caseAccounts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-account-select-table-view>
    </ng-template>
  `,
})
export class WebCaseAccountSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  caseAccount: CaseAccount

  constructor(private store: WebCaseAccountFeatureStore) {
    super()
    this.store.loadCaseAccountsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.caseAccounts$.pipe(
      switchMap((caseAccounts) => {
        return of(caseAccounts)
      }),
    )
  }
}

