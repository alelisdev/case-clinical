

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClaimProcedureFeatureStore } from '@case-clinical/web/claim-procedure/shared'
import {ClaimProcedure} from '@case-clinical/web/core/data-access'


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
      <ui-claim-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'claimProcedure_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [claimProcedure]="claimProcedure"
      >
      >
      </ui-claim-procedure-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-claim-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'claimProcedure_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [claimProcedure]="{}"
      >
      </ui-claim-procedure-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-claim-procedure-select-table-view
        class="w-full h-full bg-white"
        [claimProcedures]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-claim-procedure-select-table-view>
    </ng-template>
  `,
    providers: [WebClaimProcedureFeatureStore]
})
export class WebClaimProcedureSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  claimProcedure: ClaimProcedure

  constructor(private store: WebClaimProcedureFeatureStore) {
    super()
    this.store.loadClaimProceduresEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.claimProcedures$.pipe(
      switchMap((claimProcedures) => {
        return of(claimProcedures)
      }),
    )
  }
}

