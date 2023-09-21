import { Plan,  BillingInfo, UserCreateBillingInfoInput } from '@case-clinical/web/core/data-access'
import { SettingsBusinessActionBase } from './settings.business-action-base'
import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min, StringIsRegExMatch } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'

export class UpdateBillingAction extends SettingsBusinessActionBase<BillingInfo> {
  inputData: UserCreateBillingInfoInput

  constructor(private input: any) {
    super('UpdateBillingAction')

    this.inputData = {}
    console.log(this.input)
  }

  preValidateAction() {
    this.validationContext.addRule(
        new StringIsNotNullEmptyRange('cardHolder', 'cardHolder should be more than 2 characters', this.input.cardHolder, 2, 25, true)
    ).addRule(
        new StringIsNotNullEmptyRange('cardExpiration', 'cardExpiration should be between 2 and 5', this.input.cardExpiration, 2, 5, true)
    )

    if(this.input.cardExpiration) {
      this.inputData.expireMonth = Number(this.input.cardExpiration.substring(0, 2));
      this.inputData.expireYear = Number(this.input.cardExpiration.substring(2, 4))
      this.validationContext.addRule(
        new Min('cardExpiration', 'Expiration Month should be greater than 0', this.inputData.expireMonth, 1, true)
      ).addRule(
        new Max('cardExpiration', 'Expiration Month should be smaller than 13', this.inputData.expireMonth, 12, true)
      ).addRule(
        new Min('cardExpiration', 'Expiration year should be greater than 0', this.inputData.expireYear, 1, true)
      ).addRule(
        new Max('cardExpiration', 'Expiration year should be smaller than 100', this.inputData.expireYear, 99, true)
      ).addRule(
        new StringIsNotNullEmptyRange('country', 'You have to country', this.input.country, 2, 2, true)
      )
    }

    this.validationContext.addRule(
      new StringIsNotNullEmptyRange('zip', 'zip should be more than 2 characters', this.input.zip, 2, 10, true)
    )
  }

  postValidateAction(): void {
    super.postValidateAction()

    this.inputData.cardHolder = this.input.cardHolder;
    this.inputData.zip = this.input.zip;
    this.inputData.country = this.input.country;
    console.log('inputData = ', this.inputData)
  }

  performAction() {
    this.response = this.businessProvider.data.userUpdateBillingInfo({ input: this.inputData }).pipe(
      catchError((error) => {
        console.log('catChError', error)
        this.response = this.createFailResponse();
        return EMPTY;
      }),
      switchMap((result) => {
          return of(result.data.billingInfo)
      })
    )
  }
}
