

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared'
import {FavoriteProvider} from '@case-clinical/web/core/data-access'


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
      <ui-favorite-provider-form
        class="flex-grow flex flex-col"
        [formName]="'favoriteProvider_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [favoriteProvider]="favoriteProvider"
      >
      >
      </ui-favorite-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-favorite-provider-form
        class="flex-grow flex flex-col"
        [formName]="'favoriteProvider_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [favoriteProvider]="{}"
      >
      </ui-favorite-provider-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-favorite-provider-select-table-view
        class="w-full h-full bg-white"
        [favoriteProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-favorite-provider-select-table-view>
    </ng-template>
  `,
})
export class WebFavoriteProviderSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  favoriteProvider: FavoriteProvider

  constructor(private store: WebFavoriteProviderFeatureStore) {
    super()
    this.store.loadFavoriteProvidersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.favoriteProviders$.pipe(
      switchMap((favoriteProviders) => {
        return of(favoriteProviders)
      }),
    )
  }
}

