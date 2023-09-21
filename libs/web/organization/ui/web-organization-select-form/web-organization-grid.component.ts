

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
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
      <ui-organization-form
        class="flex-grow flex flex-col"
        [formName]="'organization_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [organization]="context.value"
      >
      </ui-organization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-organization-form
        class="flex-grow flex flex-col"
        [formName]="'organization_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [organization]="{}"
      >
      </ui-organization-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-organization-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [organizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-organization-select-table-view>
    </ng-template>
  `,
})
export class WebOrganizationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
