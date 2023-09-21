import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePatientAction} from './actions/create-patient.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Patient, UserCreatePatientInput, UserUpdatePatientInput, UpdateResult} from '@case-clinical/shared/util/sdk'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePatientsAction, UpdatePatientAction } from './actions/update-patients.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'
import { Ethnicity, Gender, Language } from "@case-clinical/shared/util/sdk";
import { ValidatePatientExcelDataAction } from './actions/validate-patient-excel-data.action'

@Injectable({providedIn: 'root',
})
export class PatientBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PatientBusinessProviderService', logger, serviceContext)
  }

  createPatient(input: UserCreatePatientInput): Observable<Patient> {
    const action = new CreatePatientAction(input);
    action.Do(this);
    return action.response;
  }

  updatePatient(input: UserUpdatePatientInput, patientId: string): Observable<Patient> {
    const action = new UpdatePatientAction(input, patientId);
    action.Do(this);
    return action.response;
  }

  importPatients(patients: UserUpdatePatientInput[]): Observable<UpdateResult> {
    const updatePatientsAction = new UpdatePatientsAction(patients);
    updatePatientsAction.Do(this)
    return updatePatientsAction.response;
  }

  validatePatientExcelData(excelData: any[], genders: Gender[], languages: Language[], ethnicities: Ethnicity[]) {
    const validatePatientExcelDataAction = new ValidatePatientExcelDataAction(excelData, genders, languages, ethnicities);
    validatePatientExcelDataAction.Do(this)
    return validatePatientExcelDataAction.response;
  }
}

