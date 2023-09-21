
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PatientBusinessActionBase} from './patient.business-action-base'
import {PatientNameIsValidRule} from '../rules/patient-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePatientInput} from '@case-clinical/shared/util/sdk';

export class UpdatePatientsAction extends PatientBusinessActionBase<boolean> {

    constructor(private patients: any[]) {
        super('UpdatePatientsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patients,
                true
            )
        )
        console.log({ patients: this.patients })
        this.patients.map((datum) => {
          if (datum.gender) {
            datum.genderId = datum.gender.id;
            delete datum['gender'];
          }
          if (datum.language) {
            datum.languageId = datum.language.id;
            delete datum['language'];
          }
          if(datum.ethniciy) {
            datum.ethnicityId = datum.ethnicity.id;
            delete datum['ethnicity'];
          }
        })
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatients({ input: { patients: this.patients} }).pipe(
                switchMap((response) => {
                  console.log(response);
                  return of(response.data.updated)
                })
            )
    }
}

export class UpdatePatientAction extends PatientBusinessActionBase<boolean> {

    constructor(private patient: UserUpdatePatientInput, private patientId: string) {
        super('UpdatePatientAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patient,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.patientId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatient({patientId: this.patientId, input: this.patient }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
