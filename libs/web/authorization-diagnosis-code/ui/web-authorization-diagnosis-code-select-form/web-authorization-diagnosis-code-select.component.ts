

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/authorization-diagnosis-code/shared'
import {AuthorizationDiagnosisCode} from '@case-clinical/web/core/data-access'


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
      <ui-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationDiagnosisCode_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationDiagnosisCode]="authorizationDiagnosisCode"
      >
      >
      </ui-authorization-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationDiagnosisCode_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationDiagnosisCode]="{}"
      >
      </ui-authorization-diagnosis-code-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-authorization-diagnosis-code-select-table-view
        class="w-full h-full bg-white"
        [authorizationDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-authorization-diagnosis-code-select-table-view>
    </ng-template>
  `,
    providers: [WebAuthorizationDiagnosisCodeFeatureStore]
})
export class WebAuthorizationDiagnosisCodeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  authorizationDiagnosisCode: AuthorizationDiagnosisCode

  constructor(private store: WebAuthorizationDiagnosisCodeFeatureStore) {
    super()
    this.store.loadAuthorizationDiagnosisCodesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.authorizationDiagnosisCodes$.pipe(
      switchMap((authorizationDiagnosisCodes) => {
        return of(authorizationDiagnosisCodes)
      }),
    )
  }
}

