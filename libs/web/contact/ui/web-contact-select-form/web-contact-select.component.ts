

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import {Contact} from '@case-clinical/web/core/data-access'


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
      <ui-contact-form
        class="flex-grow flex flex-col"
        [formName]="'contact_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contact]="contact"
      >
      >
      </ui-contact-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-form
        class="flex-grow flex flex-col"
        [formName]="'contact_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contact]="{}"
      >
      </ui-contact-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contact-select-table-view
        class="w-full h-full bg-white"
        [contacts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contact-select-table-view>
    </ng-template>
  `,
})
export class WebContactSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contact: Contact

  constructor(private store: WebContactFeatureStore) {
    super()
    this.store.loadContactsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contacts$.pipe(
      switchMap((contacts) => {
        return of(contacts)
      }),
    )
  }
}

