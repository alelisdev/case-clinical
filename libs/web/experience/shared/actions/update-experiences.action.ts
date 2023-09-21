
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ExperienceBusinessActionBase} from './experience.business-action-base'
import {ExperienceNameIsValidRule} from '../rules/experience-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateExperienceInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateExperiencesAction extends ExperienceBusinessActionBase<UpdateResult> {

    constructor(private experiences: UserUpdateExperienceInput[]) {
        super('UpdateExperiencesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.experiences,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateExperiences({ input: { experiences: this.experiences} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateExperienceAction extends ExperienceBusinessActionBase<boolean> {

    constructor(private experience: UserUpdateExperienceInput, private experienceId: string) {
        super('UpdateExperienceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.experience,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.experienceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateExperience({experienceId: this.experienceId, input: this.experience }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
