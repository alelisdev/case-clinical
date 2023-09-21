import { SettingsBusinessActionBase } from './settings.business-action-base'
import { AreEqual, StringIsNotNullEmptyRange } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'
import { AccountUpdatePasswordInput } from '@case-clinical/web/core/data-access'

export class UpdatePasswordAction extends SettingsBusinessActionBase<boolean> {
  constructor(private input: AccountUpdatePasswordInput) {
    super('UpdatePasswordAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new StringIsNotNullEmptyRange('currentPassword', 'Current password should be more than 2 characters', this.input.currentPassword, 2, 100, true)
    ).addRule(
      new StringIsNotNullEmptyRange('password', 'Password should be more than 2 characters', this.input.password, 2, 100, true)
    ).addRule(
      new AreEqual('verified', 'PasswordConfirm should match with the password', this.input.verified, this.input.password, true)
    )
  }

  performAction() {
    // First Update Username
    this.response = this.businessProvider.data.accountUpdatePassword( { input: this.input }).pipe(
      switchMap(response => of(response.data.accountUpdatePassword))
    )
  }
}
