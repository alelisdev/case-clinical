

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import {Organization} from '@case-clinical/web/core/data-access'


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
      <ui-organization-form
        class="flex-grow flex flex-col"
        [formName]="'organization_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [organization]="organization"
      >
      >
      </ui-organization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-organization-form
        class="flex-grow flex flex-col"
        [formName]="'organization_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [organization]="{}"
      >
      </ui-organization-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-organization-select-table-view
        class="w-full h-full bg-white"
        [organizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-organization-select-table-view>
    </ng-template>
  `,
})
export class WebOrganizationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  organization: Organization

  constructor(private store: WebOrganizationFeatureStore) {
    super()
    this.store.loadOrganizationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.organizations$.pipe(
      switchMap((organizations) => {
        return of(organizations)
      }),
    )
  }
}

