
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PatientTreatmentStatus, UserCreatePatientTreatmentStatusInput, UserUpdatePatientTreatmentStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePatientTreatmentStatusExcelDataAction } from './actions/validate-patient-treatment-status-excel-data.action'
import { CreatePatientTreatmentStatusAction } from './actions/create-patient-treatment-status.action'
import { UpdatePatientTreatmentStatusesAction, UpdatePatientTreatmentStatusAction } from './actions/update-patient-treatment-statuses.action'


@Injectable({providedIn: 'root'})
export class PatientTreatmentStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PatientTreatmentStatusBusinessProviderService', logger, serviceContext)
  }

  createPatientTreatmentStatus(input: UserCreatePatientTreatmentStatusInput): Observable<PatientTreatmentStatus> {
    const action = new CreatePatientTreatmentStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePatientTreatmentStatus(input: UserUpdatePatientTreatmentStatusInput, patientTreatmentStatusId: string): Observable<PatientTreatmentStatus> {
    const action = new UpdatePatientTreatmentStatusAction(input, patientTreatmentStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importPatientTreatmentStatuses(patientTreatmentStatuses: UserUpdatePatientTreatmentStatusInput[]): Observable<UpdateResult> {
    const updatePatientTreatmentStatusesAction = new UpdatePatientTreatmentStatusesAction(patientTreatmentStatuses);
    updatePatientTreatmentStatusesAction.Do(this)
    return updatePatientTreatmentStatusesAction.response;
  }

  validatePatientTreatmentStatusExcelData(excelData: any[] ) {
    const validatePatientTreatmentStatusExcelDataAction = new ValidatePatientTreatmentStatusExcelDataAction(excelData );
    validatePatientTreatmentStatusExcelDataAction.Do(this)
    return validatePatientTreatmentStatusExcelDataAction.response;
  }
}

