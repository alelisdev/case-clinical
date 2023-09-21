

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTemplateFeatureStore } from '../../shared/template.store'
import { Template } from '@case-clinical/web/core/data-access'
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
      <ui-template-form
        class="flex-grow flex flex-col"
        [formName]="'template_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [template]="template"
      >
      >
      </ui-template-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-template-form
        class="flex-grow flex flex-col"
        [formName]="'template_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [template]="{}"
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
  template: Template

  constructor(private store: WebTemplateFeatureStore) {
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

