

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCountryFeatureStore } from '@case-clinical/web/country/shared'
import {Country} from '@case-clinical/web/core/data-access'


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
      <ui-country-form
        class="flex-grow flex flex-col"
        [formName]="'country_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [country]="country"
      >
      >
      </ui-country-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-country-form
        class="flex-grow flex flex-col"
        [formName]="'country_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [country]="{}"
      >
      </ui-country-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-country-select-table-view
        class="w-full h-full bg-white"
        [countries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-country-select-table-view>
    </ng-template>
  `,
})
export class WebCountrySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  country: Country

  constructor(private store: WebCountryFeatureStore) {
    super()
    this.store.loadCountriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.countries$.pipe(
      switchMap((countries) => {
        return of(countries)
      }),
    )
  }
}

