

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLanguageFeatureStore } from '@case-clinical/web/language/shared'
import {Language} from '@case-clinical/web/core/data-access'


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
      <ui-language-form
        class="flex-grow flex flex-col"
        [formName]="'language_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [language]="language"
      >
      >
      </ui-language-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-language-form
        class="flex-grow flex flex-col"
        [formName]="'language_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [language]="{}"
      >
      </ui-language-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-language-select-table-view
        class="w-full h-full bg-white"
        [languages]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-language-select-table-view>
    </ng-template>
  `,
})
export class WebLanguageSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  language: Language

  constructor(private store: WebLanguageFeatureStore) {
    super()
    this.store.loadLanguagesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.languages$.pipe(
      switchMap((languages) => {
        return of(languages)
      }),
    )
  }
}

