import { SettingsBusinessActionBase } from './settings.business-action-base'
import { StringIsNotNullEmptyRange } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'
// import { Account, UserUpdateAccountInput } from '@case-clinical/web/core/data-access'

export class UpdateAccountAction extends SettingsBusinessActionBase<boolean> {
  constructor(private input: any) {
    super('UpdateAccountAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new StringIsNotNullEmptyRange('username', 'Username should be more than 2 characters', this.input.username, 2, 100, true)
    ).addRule(
      new StringIsNotNullEmptyRange('firstName', 'FirstName should be more than 2 characters', this.input.firstName, 2, 100, true)
    ).addRule(
      new StringIsNotNullEmptyRange('lastName', 'LastName should be more than 2 characters', this.input.lastName, 2, 100, true)
    ).addRule(
      new StringIsNotNullEmptyRange('phone', 'Phone should be more than 2 characters', this.input.phone, 2, 100, true)
    ).addRule(
      new StringIsNotNullEmptyRange('dateOfBirth', 'DateOfBirth should be more than 2 characters', this.input.dateOfBirth, 2, 100, true)
    )
  }

  performAction() {
    // First Update Username
    this.response = this.businessProvider.data.accountUpdateUsername({ username: this.input.username }).pipe(
      // If succeeds on username update, then update profile
      switchMap((result) => this.businessProvider.data.accountUpdateProfile({
        input: {
          firstName: this.input.firstName,
          lastName: this.input.lastName,
          dateOfBirth: this.input.dateOfBirth,
          phone: this.input.phone,
          location: this.input.location,
          line1: this.input.line1,
          line2: this.input.line2,
          city: this.input.city,
          state: this.input.state,
          postalCode: this.input.postalCode,
        }
      }).pipe(
        switchMap((response) => of(response.data.accountUpdateProfile))
      )
      )
    )
  }
}
