

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'
import {VisitKind} from '@case-clinical/web/core/data-access'


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
      <ui-visit-kind-form
        class="flex-grow flex flex-col"
        [formName]="'visitKind_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [visitKind]="visitKind"
      >
      >
      </ui-visit-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-visit-kind-form
        class="flex-grow flex flex-col"
        [formName]="'visitKind_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [visitKind]="{}"
      >
      </ui-visit-kind-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-visit-kind-select-table-view
        class="w-full h-full bg-white"
        [visitKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-visit-kind-select-table-view>
    </ng-template>
  `,
})
export class WebVisitKindSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  visitKind: VisitKind

  constructor(private store: WebVisitKindFeatureStore) {
    super()
    this.store.loadVisitKindsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.visitKinds$.pipe(
      switchMap((visitKinds) => {
        return of(visitKinds)
      }),
    )
  }
}

