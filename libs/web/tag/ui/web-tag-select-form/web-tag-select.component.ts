

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'
import {Tag} from '@case-clinical/web/core/data-access'


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
      <ui-tag-form
        class="flex-grow flex flex-col"
        [formName]="'tag_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [tag]="tag"
      >
      >
      </ui-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-tag-form
        class="flex-grow flex flex-col"
        [formName]="'tag_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [tag]="{}"
      >
      </ui-tag-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-tag-select-table-view
        class="w-full h-full bg-white"
        [tags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-tag-select-table-view>
    </ng-template>
  `,
    providers: [WebTagFeatureStore]
})
export class WebTagSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  tag: Tag

  constructor(private store: WebTagFeatureStore) {
    super()
    this.store.loadTagsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.tags$.pipe(
      switchMap((tags) => {
        return of(tags)
      }),
    )
  }
}

