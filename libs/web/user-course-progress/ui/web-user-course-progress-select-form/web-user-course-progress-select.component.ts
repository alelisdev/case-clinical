

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebUserCourseProgressFeatureStore } from '@case-clinical/web/user-course-progress/shared'

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-user-course-progress-form
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [userCourseProgress]="context.value || {}"
      >
      </ui-user-course-progress-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-user-course-progress-select-table-view
        class="w-full h-full bg-white"
        [userCourseProgresses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-user-course-progress-select-table-view>
    </ng-template>
  `,
})
export class WebUserCourseProgressSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl

  constructor(private store: WebUserCourseProgressFeatureStore) {
    super()
    this.store.loadUserCourseProgressesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.userCourseProgresses$.pipe(
      switchMap((userCourseProgresses) => {
        return of(userCourseProgresses)
      }),
    )
  }
}

