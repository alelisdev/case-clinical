import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { SecurityStore } from './security.component.store'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-security',
  templateUrl: './security.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SecurityStore],
})
export class SettingsSecurityComponent{
  @Input() isSignUpProcess = false
  securityForm: FormGroup

  constructor(private _formBuilder: FormBuilder, private store: SecurityStore) {}
  vm$ = this.store.vm$

}
