

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationTypeFeatureStore } from '@case-clinical/web/authorization-type/shared'
import {AuthorizationType} from '@case-clinical/web/core/data-access'


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
      <ui-authorization-type-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationType]="authorizationType"
      >
      >
      </ui-authorization-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-type-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationType]="{}"
      >
      </ui-authorization-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-authorization-type-select-table-view
        class="w-full h-full bg-white"
        [authorizationTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-authorization-type-select-table-view>
    </ng-template>
  `,
    providers: [WebAuthorizationTypeFeatureStore]
})
export class WebAuthorizationTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  authorizationType: AuthorizationType

  constructor(private store: WebAuthorizationTypeFeatureStore) {
    super()
    this.store.loadAuthorizationTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.authorizationTypes$.pipe(
      switchMap((authorizationTypes) => {
        return of(authorizationTypes)
      }),
    )
  }
}

