
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {UserBusinessActionBase} from './user.business-action-base'
import {UserNameIsValidRule} from '../rules/user-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateUserInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateUsersAction extends UserBusinessActionBase<UpdateResult> {

    constructor(private users: UserUpdateUserInput[]) {
        super('UpdateUsersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.users,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateUsers({ input: { users: this.users} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateUserAction extends UserBusinessActionBase<boolean> {

    constructor(private user: UserUpdateUserInput, private userId: string) {
        super('UpdateUserAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.user,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.userId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateUser({userId: this.userId, input: this.user }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
