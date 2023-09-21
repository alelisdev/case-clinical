

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'
import {MedLevel} from '@case-clinical/web/core/data-access'


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
      <ui-med-level-form
        class="flex-grow flex flex-col"
        [formName]="'medLevel_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medLevel]="medLevel"
      >
      >
      </ui-med-level-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-med-level-form
        class="flex-grow flex flex-col"
        [formName]="'medLevel_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medLevel]="{}"
      >
      </ui-med-level-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-med-level-select-table-view
        class="w-full h-full bg-white"
        [medLevels]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-med-level-select-table-view>
    </ng-template>
  `,
})
export class WebMedLevelSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  medLevel: MedLevel

  constructor(private store: WebMedLevelFeatureStore) {
    super()
    this.store.loadMedLevelsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.medLevels$.pipe(
      switchMap((medLevels) => {
        return of(medLevels)
      }),
    )
  }
}

