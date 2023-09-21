import { EventEmitter, Input } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AccountStore } from './account.store';
import { FormService } from '@case-clinical/web/ui/form';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-account',
  templateUrl: './account.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountStore
  ]
})
export class SettingsAccountComponent implements OnInit {
  @Input() isSignUpProcess = false
  @Output() send = new EventEmitter<void>()

  vm$ = this.store.vm$

  constructor(public formService: FormService, private store: AccountStore) { }

  ngOnInit(): void {
    this.store.loadAccountProfileEffect();
  }

  submit(formData) {
    const location = formData['location'];
    alert(JSON.stringify(formData))
    this.store.updateAccountEffect({ input: formData, resultEmitter: this.send })
  }
}
