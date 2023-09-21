
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PatientStudyBusinessActionBase} from './patient-study.business-action-base'
import {PatientStudyNameIsValidRule} from '../rules/patient-study-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePatientStudyInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePatientStudiesAction extends PatientStudyBusinessActionBase<UpdateResult> {

    constructor(private patientStudies: UserUpdatePatientStudyInput[]) {
        super('UpdatePatientStudiesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patientStudies,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatientStudies({ input: { patientStudies: this.patientStudies} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePatientStudyAction extends PatientStudyBusinessActionBase<boolean> {

    constructor(private patientStudy: UserUpdatePatientStudyInput, private patientStudyId: string) {
        super('UpdatePatientStudyAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patientStudy,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.patientStudyId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatientStudy({patientStudyId: this.patientStudyId, input: this.patientStudy }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
