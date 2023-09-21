

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebExperienceFeatureStore } from '@case-clinical/web/experience/shared'
import {Experience} from '@case-clinical/web/core/data-access'


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
      <ui-experience-form
        class="flex-grow flex flex-col"
        [formName]="'experience_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [experience]="experience"
      >
      >
      </ui-experience-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-experience-form
        class="flex-grow flex flex-col"
        [formName]="'experience_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [experience]="{}"
      >
      </ui-experience-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-experience-select-table-view
        class="w-full h-full bg-white"
        [experiences]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-experience-select-table-view>
    </ng-template>
  `,
})
export class WebExperienceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  experience: Experience

  constructor(private store: WebExperienceFeatureStore) {
    super()
    this.store.loadExperiencesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.experiences$.pipe(
      switchMap((experiences) => {
        return of(experiences)
      }),
    )
  }
}

