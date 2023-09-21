

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared'
import {Review} from '@case-clinical/web/core/data-access'


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
      <ui-review-form
        class="flex-grow flex flex-col"
        [formName]="'review_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [review]="review"
      >
      >
      </ui-review-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-review-form
        class="flex-grow flex flex-col"
        [formName]="'review_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [review]="{}"
      >
      </ui-review-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-review-select-table-view
        class="w-full h-full bg-white"
        [reviews]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-review-select-table-view>
    </ng-template>
  `,
})
export class WebReviewSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  review: Review

  constructor(private store: WebReviewFeatureStore) {
    super()
    this.store.loadReviewsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.reviews$.pipe(
      switchMap((reviews) => {
        return of(reviews)
      }),
    )
  }
}

