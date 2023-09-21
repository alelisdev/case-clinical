
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClaimBusinessActionBase} from './claim.business-action-base'
import {ClaimNameIsValidRule} from '../rules/claim-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClaimInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClaimsAction extends ClaimBusinessActionBase<UpdateResult> {

    constructor(private claims: UserUpdateClaimInput[]) {
        super('UpdateClaimsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.claims,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClaims({ input: { claims: this.claims} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClaimAction extends ClaimBusinessActionBase<boolean> {

    constructor(private claim: UserUpdateClaimInput, private claimId: string) {
        super('UpdateClaimAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.claim,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.claimId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClaim({claimId: this.claimId, input: this.claim }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
