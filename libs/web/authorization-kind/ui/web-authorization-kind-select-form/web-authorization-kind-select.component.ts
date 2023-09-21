

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationKindFeatureStore } from '@case-clinical/web/authorization-kind/shared'
import {AuthorizationKind} from '@case-clinical/web/core/data-access'


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
      <ui-authorization-kind-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationKind_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationKind]="authorizationKind"
      >
      >
      </ui-authorization-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-kind-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationKind_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationKind]="{}"
      >
      </ui-authorization-kind-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-authorization-kind-select-table-view
        class="w-full h-full bg-white"
        [authorizationKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-authorization-kind-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationKindSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  authorizationKind: AuthorizationKind

  constructor(private store: WebAuthorizationKindFeatureStore) {
    super()
    this.store.loadAuthorizationKindsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.authorizationKinds$.pipe(
      switchMap((authorizationKinds) => {
        return of(authorizationKinds)
      }),
    )
  }
}

