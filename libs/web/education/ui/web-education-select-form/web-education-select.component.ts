

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEducationFeatureStore } from '@case-clinical/web/education/shared'
import {Education} from '@case-clinical/web/core/data-access'


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
      <ui-education-form
        class="flex-grow flex flex-col"
        [formName]="'education_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [education]="education"
      >
      >
      </ui-education-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-education-form
        class="flex-grow flex flex-col"
        [formName]="'education_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [education]="{}"
      >
      </ui-education-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-education-select-table-view
        class="w-full h-full bg-white"
        [educations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-education-select-table-view>
    </ng-template>
  `,
})
export class WebEducationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  education: Education

  constructor(private store: WebEducationFeatureStore) {
    super()
    this.store.loadEducationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.educations$.pipe(
      switchMap((educations) => {
        return of(educations)
      }),
    )
  }
}

