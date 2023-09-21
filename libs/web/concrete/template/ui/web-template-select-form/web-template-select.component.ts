

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTemplateSelectFormStore } from './web-template-select-form.store'

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-template-form
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [template]="context.value || {}"
      >
      </ui-template-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-template-select-table-view
        class="w-full h-full bg-white"
        [templates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-template-select-table-view>
    </ng-template>
  `,
})
export class WebTemplateSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl

  constructor(private store: WebTemplateSelectFormStore) {
    super()
    this.store.loadTemplatesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.templates$.pipe(
      switchMap((templates) => {
        return of(templates)
      }),
    )
  }
}

