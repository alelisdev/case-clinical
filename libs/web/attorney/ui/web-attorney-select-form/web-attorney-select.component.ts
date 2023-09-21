/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { FormService } from '@case-clinical/web/ui/form'
import { switchMap, of } from 'rxjs'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import {Attorney} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
      [routerKeys]="routerKeys"
      (formRouterKeyDidChange)="formRouterKeyDidChange($event)"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-attorney-form
        class="flex-grow flex flex-col"
        [formName]="'attorney_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorney]="attorney"
      >
      >
      </ui-attorney-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-attorney-form
        class="flex-grow flex flex-col"
        [formName]="'attorney_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorney]="{}"
      >
      </ui-attorney-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-attorney-select-table-view
        class="w-full h-full bg-white"
        [attorneys]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-attorney-select-table-view>
    </ng-template>
  `,
  providers: [WebAttorneyFeatureStore],
})
export class WebAttorneySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  attorney: Attorney
  subscriber: any

  routerKeys = [ 'firmId', 'attorneyStatusId', 'attorneyTypeId' ];

  constructor(private store: WebAttorneyFeatureStore, private formService: FormService) {
    super()
    this.store.loadAttorneysEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.attorneys$.pipe(
      switchMap((attorneys) => {
        return of(attorneys)
      }),
    )
  }

  formRouterKeyDidChange(routerKeys) {
    const firmId = routerKeys["firmId"]
    this.store.setFirmId(firmId)

    const attorneyStatusId = routerKeys["attorneyStatusId"]
    this.store.setAttorneyStatusId(attorneyStatusId)

    const attorneyTypeId = routerKeys["attorneyTypeId"]
    this.store.setAttorneyTypeId(attorneyTypeId)

    this.store.loadAttorneysEffect();
  }
}

