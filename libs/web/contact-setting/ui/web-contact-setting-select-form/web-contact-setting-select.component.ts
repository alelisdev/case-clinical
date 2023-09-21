

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactSettingFeatureStore } from '@case-clinical/web/contact-setting/shared'
import {ContactSetting} from '@case-clinical/web/core/data-access'


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
      <ui-contact-setting-form
        class="flex-grow flex flex-col"
        [formName]="'contactSetting_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactSetting]="contactSetting"
      >
      >
      </ui-contact-setting-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-setting-form
        class="flex-grow flex flex-col"
        [formName]="'contactSetting_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contactSetting]="{}"
      >
      </ui-contact-setting-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contact-setting-select-table-view
        class="w-full h-full bg-white"
        [contactSettings]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contact-setting-select-table-view>
    </ng-template>
  `,
})
export class WebContactSettingSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contactSetting: ContactSetting

  constructor(private store: WebContactSettingFeatureStore) {
    super()
    this.store.loadContactSettingsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contactSettings$.pipe(
      switchMap((contactSettings) => {
        return of(contactSettings)
      }),
    )
  }
}

