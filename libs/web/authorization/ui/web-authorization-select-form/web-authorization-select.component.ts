

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import {Authorization} from '@case-clinical/web/core/data-access'


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
      <ui-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'authorization_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorization]="authorization"
      >
      >
      </ui-authorization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'authorization_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorization]="{}"
      >
      </ui-authorization-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-authorization-select-table-view
        class="w-full h-full bg-white"
        [authorizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-authorization-select-table-view>
    </ng-template>
  `,
    providers: [WebAuthorizationFeatureStore]
})
export class WebAuthorizationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  authorization: Authorization

  constructor(private store: WebAuthorizationFeatureStore) {
    super()
    this.store.loadAuthorizationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.authorizations$.pipe(
      switchMap((authorizations) => {
        return of(authorizations)
      }),
    )
  }
}

