
import { Component,EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core'
import { RoleFeaturePermission } from '@case-clinical/web/core/data-access'
import { WebRoleFeaturePermissionFeatureStore } from '@case-clinical/web/role-feature-permission/shared'
import { Subject,takeUntil } from 'rxjs'

@Component({
  selector: 'ui-role-feature-permission-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
      <ui-formly-json-form
        [formName]="roleFeaturePermission.id ? 'roleFeaturePermission_edit' : 'roleFeaturePermission_create'"
        [showSubmitButton]="true"
        [model]="roleFeaturePermission || {}"
        [componentStore]="store"
        (discard)="close.emit()"
      ></ui-formly-json-form>
      </div>
    </div>
  `,
})
export class WebFormsUiRoleFeaturePermissionComponent implements OnInit, OnDestroy {
  @Input() roleFeaturePermission: RoleFeaturePermission = {}
  @Output() send = new EventEmitter<any>()
  @Output() close = new EventEmitter()

  private subscriber;

  constructor(
    public readonly store: WebRoleFeaturePermissionFeatureStore,
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
