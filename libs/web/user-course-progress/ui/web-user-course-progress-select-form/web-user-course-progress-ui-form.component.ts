
import { Component,EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core'
import { UserCourseProgress } from '@case-clinical/web/core/data-access'
import { WebUserCourseProgressFeatureStore } from '@case-clinical/web/user-course-progress/shared'
import { Subject,takeUntil } from 'rxjs'

@Component({
  selector: 'ui-user-course-progress-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
      <ui-formly-json-form
        [formName]="userCourseProgress.id ? 'userCourseProgress_edit' : 'userCourseProgress_create'"
        [showSubmitButton]="true"
        [model]="userCourseProgress || {}"
        [componentStore]="store"
        (discard)="close.emit()"
      ></ui-formly-json-form>
      </div>
    </div>
  `,
})
export class WebFormsUiUserCourseProgressComponent implements OnInit, OnDestroy {
  @Input() userCourseProgress: UserCourseProgress = {}
  @Output() send = new EventEmitter<any>()
  @Output() close = new EventEmitter()

  private subscriber;

  constructor(
    public readonly store: WebUserCourseProgressFeatureStore,
  ) {
   }

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({done,item}) => {
      if(done) {
        this.send.emit(item);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

}
