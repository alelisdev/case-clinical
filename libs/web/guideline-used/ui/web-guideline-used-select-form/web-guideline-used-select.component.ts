

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebGuidelineUsedFeatureStore } from '@case-clinical/web/guideline-used/shared'
import {GuidelineUsed} from '@case-clinical/web/core/data-access'


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
      <ui-guideline-used-form
        class="flex-grow flex flex-col"
        [formName]="'guidelineUsed_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guidelineUsed]="guidelineUsed"
      >
      >
      </ui-guideline-used-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-guideline-used-form
        class="flex-grow flex flex-col"
        [formName]="'guidelineUsed_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guidelineUsed]="{}"
      >
      </ui-guideline-used-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-guideline-used-select-table-view
        class="w-full h-full bg-white"
        [guidelineUseds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-guideline-used-select-table-view>
    </ng-template>
  `,
})
export class WebGuidelineUsedSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  guidelineUsed: GuidelineUsed

  constructor(private store: WebGuidelineUsedFeatureStore) {
    super()
    this.store.loadGuidelineUsedsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.guidelineUseds$.pipe(
      switchMap((guidelineUseds) => {
        return of(guidelineUseds)
      }),
    )
  }
}

