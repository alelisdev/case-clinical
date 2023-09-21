

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebExperienceFeatureStore } from '@case-clinical/web/experience/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-experience-form
        class="flex-grow flex flex-col"
        [formName]="'experience_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [experience]="context.value"
      >
      </ui-experience-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-experience-form
        class="flex-grow flex flex-col"
        [formName]="'experience_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [experience]="{}"
      >
      </ui-experience-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-experience-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [experiences]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-experience-select-table-view>
    </ng-template>
  `,
})
export class WebExperienceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
