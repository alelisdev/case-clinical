
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {OrganizationBusinessActionBase} from './organization.business-action-base'
import {OrganizationNameIsValidRule} from '../rules/organization-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateOrganizationInput} from '@case-clinical/shared/util/sdk';

export class UpdateOrganizationsAction extends OrganizationBusinessActionBase<boolean> {

    constructor(private organizations: UserUpdateOrganizationInput[]) {
        super('UpdateOrganizationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.organizations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateOrganizations({ input: { organizations: this.organizations} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateOrganizationAction extends OrganizationBusinessActionBase<boolean> {

    constructor(private organization: UserUpdateOrganizationInput, private organizationId: string) {
        super('UpdateOrganizationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.organization,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.organizationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateOrganization({organizationId: this.organizationId, input: this.organization }).pipe(
                switchMap(() => of(true))
            )
    }
}
