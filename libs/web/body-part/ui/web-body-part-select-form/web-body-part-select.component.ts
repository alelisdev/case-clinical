

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBodyPartFeatureStore } from '@case-clinical/web/body-part/shared'
import {BodyPart} from '@case-clinical/web/core/data-access'


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
      <ui-body-part-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPart_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPart]="bodyPart"
      >
      >
      </ui-body-part-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-body-part-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPart_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPart]="{}"
      >
      </ui-body-part-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-body-part-select-table-view
        class="w-full h-full bg-white"
        [bodyParts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-body-part-select-table-view>
    </ng-template>
  `,
})
export class WebBodyPartSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  bodyPart: BodyPart

  constructor(private store: WebBodyPartFeatureStore) {
    super()
    this.store.loadBodyPartsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.bodyParts$.pipe(
      switchMap((bodyParts) => {
        return of(bodyParts)
      }),
    )
  }
}

