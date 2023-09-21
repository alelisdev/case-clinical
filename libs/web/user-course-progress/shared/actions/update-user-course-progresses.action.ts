
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {UserCourseProgressBusinessActionBase} from './user-course-progress.business-action-base'
import {UserCourseProgressNameIsValidRule} from '../rules/user-course-progress-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateUserCourseProgressInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateUserCourseProgressesAction extends UserCourseProgressBusinessActionBase<UpdateResult> {

    constructor(private userCourseProgresses: UserUpdateUserCourseProgressInput[]) {
        super('UpdateUserCourseProgressesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.userCourseProgresses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateUserCourseProgresses({ input: { userCourseProgresses: this.userCourseProgresses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateUserCourseProgressAction extends UserCourseProgressBusinessActionBase<boolean> {

    constructor(private userCourseProgress: UserUpdateUserCourseProgressInput, private userCourseProgressId: string) {
        super('UpdateUserCourseProgressAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.userCourseProgress,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.userCourseProgressId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateUserCourseProgress({userCourseProgressId: this.userCourseProgressId, input: this.userCourseProgress }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
