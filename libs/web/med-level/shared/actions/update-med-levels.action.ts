
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {MedLevelBusinessActionBase} from './med-level.business-action-base'
import {MedLevelNameIsValidRule} from '../rules/med-level-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateMedLevelInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateMedLevelsAction extends MedLevelBusinessActionBase<UpdateResult> {

    constructor(private medLevels: UserUpdateMedLevelInput[]) {
        super('UpdateMedLevelsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medLevels,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedLevels({ input: { medLevels: this.medLevels} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateMedLevelAction extends MedLevelBusinessActionBase<boolean> {

    constructor(private medLevel: UserUpdateMedLevelInput, private medLevelId: string) {
        super('UpdateMedLevelAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medLevel,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.medLevelId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedLevel({medLevelId: this.medLevelId, input: this.medLevel }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
