
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Patient, UserCreatePatientInput, UserUpdatePatientInput, UpdateResult, Ethnicity, Gender, Language } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePatientExcelDataAction } from './actions/validate-patient-excel-data.action'
import { CreatePatientAction } from './actions/create-patient.action'
import { UpdatePatientsAction, UpdatePatientAction } from './actions/update-patients.action'


@Injectable({providedIn: 'root'})
export class PatientBusinessProviderService extends ServiceBase {
  constructor(
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

  validatePatientExcelData(excelData: any[], ethnicities: Ethnicity[], genders: Gender[], languages: Language[]) {
    const validatePatientExcelDataAction = new ValidatePatientExcelDataAction(excelData, ethnicities, genders, languages);
    validatePatientExcelDataAction.Do(this)
    return validatePatientExcelDataAction.response;
  }
}

