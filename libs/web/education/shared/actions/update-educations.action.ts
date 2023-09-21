
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {EducationBusinessActionBase} from './education.business-action-base'
import {EducationNameIsValidRule} from '../rules/education-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateEducationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateEducationsAction extends EducationBusinessActionBase<UpdateResult> {

    constructor(private educations: UserUpdateEducationInput[]) {
        super('UpdateEducationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.educations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEducations({ input: { educations: this.educations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateEducationAction extends EducationBusinessActionBase<boolean> {

    constructor(private education: UserUpdateEducationInput, private educationId: string) {
        super('UpdateEducationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.education,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.educationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEducation({educationId: this.educationId, input: this.education }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
