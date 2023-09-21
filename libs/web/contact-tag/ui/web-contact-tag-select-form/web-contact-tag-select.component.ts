

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactTagFeatureStore } from '@case-clinical/web/contact-tag/shared'
import {ContactTag} from '@case-clinical/web/core/data-access'


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
      <ui-contact-tag-form
        class="flex-grow flex flex-col"
        [formName]="'contactTag_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactTag]="contactTag"
      >
      >
      </ui-contact-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-tag-form
        class="flex-grow flex flex-col"
        [formName]="'contactTag_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactTag]="{}"
      >
      </ui-contact-tag-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contact-tag-select-table-view
        class="w-full h-full bg-white"
        [contactTags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contact-tag-select-table-view>
    </ng-template>
  `,
})
export class WebContactTagSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contactTag: ContactTag

  constructor(private store: WebContactTagFeatureStore) {
    super()
    this.store.loadContactTagsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contactTags$.pipe(
      switchMap((contactTags) => {
        return of(contactTags)
      }),
    )
  }
}

