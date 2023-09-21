
import { Component,EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core'
import { User } from '@case-clinical/web/core/data-access'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { Subject,takeUntil } from 'rxjs'

@Component({
  selector: 'ui-user-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
      <ui-formly-json-form
        [formName]="user.id ? 'user_edit' : 'user_create'"
        [showSubmitButton]="true"
        [model]="user || {}"
        [componentStore]="store"
        (discard)="close.emit()"
      ></ui-formly-json-form>
      </div>
    </div>
  `,
})
export class WebFormsUiUserComponent implements OnInit, OnDestroy {
  @Input() user: User = {}
  @Output() send = new EventEmitter<any>()
  @Output() close = new EventEmitter()

  private subscriber;

  constructor(
    public readonly store: WebUserFeatureStore,
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
