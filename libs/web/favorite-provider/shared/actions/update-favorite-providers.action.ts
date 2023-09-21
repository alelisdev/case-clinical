
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {FavoriteProviderBusinessActionBase} from './favorite-provider.business-action-base'
import {FavoriteProviderNameIsValidRule} from '../rules/favorite-provider-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateFavoriteProviderInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateFavoriteProvidersAction extends FavoriteProviderBusinessActionBase<UpdateResult> {

    constructor(private favoriteProviders: UserUpdateFavoriteProviderInput[]) {
        super('UpdateFavoriteProvidersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.favoriteProviders,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFavoriteProviders({ input: { favoriteProviders: this.favoriteProviders} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateFavoriteProviderAction extends FavoriteProviderBusinessActionBase<boolean> {

    constructor(private favoriteProvider: UserUpdateFavoriteProviderInput, private favoriteProviderId: string) {
        super('UpdateFavoriteProviderAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.favoriteProvider,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.favoriteProviderId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFavoriteProvider({favoriteProviderId: this.favoriteProviderId, input: this.favoriteProvider }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
