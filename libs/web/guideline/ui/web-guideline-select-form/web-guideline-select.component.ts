

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebGuidelineFeatureStore } from '@case-clinical/web/guideline/shared'
import {Guideline} from '@case-clinical/web/core/data-access'


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
      <ui-guideline-form
        class="flex-grow flex flex-col"
        [formName]="'guideline_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guideline]="guideline"
      >
      >
      </ui-guideline-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-guideline-form
        class="flex-grow flex flex-col"
        [formName]="'guideline_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guideline]="{}"
      >
      </ui-guideline-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-guideline-select-table-view
        class="w-full h-full bg-white"
        [guidelines]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-guideline-select-table-view>
    </ng-template>
  `,
})
export class WebGuidelineSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  guideline: Guideline

  constructor(private store: WebGuidelineFeatureStore) {
    super()
    this.store.loadGuidelinesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.guidelines$.pipe(
      switchMap((guidelines) => {
        return of(guidelines)
      }),
    )
  }
}

