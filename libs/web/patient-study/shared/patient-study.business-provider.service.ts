
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PatientStudy, UserCreatePatientStudyInput, UserUpdatePatientStudyInput, UpdateResult, Patient } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePatientStudyExcelDataAction } from './actions/validate-patient-study-excel-data.action'
import { CreatePatientStudyAction } from './actions/create-patient-study.action'
import { UpdatePatientStudiesAction, UpdatePatientStudyAction } from './actions/update-patient-studies.action'


@Injectable({providedIn: 'root'})
export class PatientStudyBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PatientStudyBusinessProviderService', logger, serviceContext)
  }

  createPatientStudy(input: UserCreatePatientStudyInput): Observable<PatientStudy> {
    const action = new CreatePatientStudyAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePatientStudy(input: UserUpdatePatientStudyInput, patientStudyId: string): Observable<PatientStudy> {
    const action = new UpdatePatientStudyAction(input, patientStudyId); 
    action.Do(this);
    return action.response;   
  }
  
  importPatientStudies(patientStudies: UserUpdatePatientStudyInput[]): Observable<UpdateResult> {
    const updatePatientStudiesAction = new UpdatePatientStudiesAction(patientStudies);
    updatePatientStudiesAction.Do(this)
    return updatePatientStudiesAction.response;
  }

  validatePatientStudyExcelData(excelData: any[], patients: Patient[]) {
    const validatePatientStudyExcelDataAction = new ValidatePatientStudyExcelDataAction(excelData, patients);
    validatePatientStudyExcelDataAction.Do(this)
    return validatePatientStudyExcelDataAction.response;
  }
}

