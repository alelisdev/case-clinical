import { NovuNotification } from '@case-clinical/web/core/data-access';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationStore } from './notification.store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-notifications',
  templateUrl: './notifications.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NotificationStore
  ]
})
export class SettingsNotificationsComponent implements OnInit {
  @Input() isSignUpProcess = false

  notificationsForm: FormGroup;
  vm$ = this.store.vm$
  /**
   * Constructor
   */
  constructor(
    private store: NotificationStore
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.store.loadNotificationsEffect()
  }

  toggleSubscribe(novuNotification: NovuNotification) {
    if(novuNotification) {
      this.store.unsubscribeNotificationEffect(novuNotification)
    } else {
      this.store.subscribeNotificationEffect(novuNotification)
    }
  }
}
