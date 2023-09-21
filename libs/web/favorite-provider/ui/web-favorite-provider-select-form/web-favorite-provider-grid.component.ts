

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-favorite-provider-form
        class="flex-grow flex flex-col"
        [formName]="'favoriteProvider_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [favoriteProvider]="context.value"
      >
      </ui-favorite-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-favorite-provider-form
        class="flex-grow flex flex-col"
        [formName]="'favoriteProvider_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [favoriteProvider]="{}"
      >
      </ui-favorite-provider-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-favorite-provider-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [favoriteProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-favorite-provider-select-table-view>
    </ng-template>
  `,
})
export class WebFavoriteProviderGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
