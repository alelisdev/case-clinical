

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import {Claim} from '@case-clinical/web/core/data-access'


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
      <ui-claim-form
        class="flex-grow flex flex-col"
        [formName]="'claim_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [claim]="claim"
      >
      >
      </ui-claim-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-claim-form
        class="flex-grow flex flex-col"
        [formName]="'claim_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [claim]="{}"
      >
      </ui-claim-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-claim-select-table-view
        class="w-full h-full bg-white"
        [claims]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-claim-select-table-view>
    </ng-template>
  `,
})
export class WebClaimSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  claim: Claim

  constructor(private store: WebClaimFeatureStore) {
    super()
    this.store.loadClaimsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.claims$.pipe(
      switchMap((claims) => {
        return of(claims)
      }),
    )
  }
}

