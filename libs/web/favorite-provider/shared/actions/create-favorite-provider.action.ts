
import {FavoriteProviderBusinessActionBase} from './favorite-provider.business-action-base'
import {FavoriteProvider,UserCreateFavoriteProviderInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateFavoriteProviderInputIsValidRule} from '../rules/create-favorite-provider-input-is-valid.rule'

export class CreateFavoriteProviderAction extends FavoriteProviderBusinessActionBase<FavoriteProvider> {
  constructor(private input: UserCreateFavoriteProviderInput) {
    super('CreateFavoriteProviderAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateFavoriteProviderInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateFavoriteProvider({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


