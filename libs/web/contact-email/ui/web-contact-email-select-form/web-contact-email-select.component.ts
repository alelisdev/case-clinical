

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactEmailFeatureStore } from '@case-clinical/web/contact-email/shared'
import {ContactEmail} from '@case-clinical/web/core/data-access'


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
      <ui-contact-email-form
        class="flex-grow flex flex-col"
        [formName]="'contactEmail_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactEmail]="contactEmail"
      >
      >
      </ui-contact-email-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-email-form
        class="flex-grow flex flex-col"
        [formName]="'contactEmail_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactEmail]="{}"
      >
      </ui-contact-email-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contact-email-select-table-view
        class="w-full h-full bg-white"
        [contactEmails]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contact-email-select-table-view>
    </ng-template>
  `,
})
export class WebContactEmailSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contactEmail: ContactEmail

  constructor(private store: WebContactEmailFeatureStore) {
    super()
    this.store.loadContactEmailsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contactEmails$.pipe(
      switchMap((contactEmails) => {
        return of(contactEmails)
      }),
    )
  }
}

