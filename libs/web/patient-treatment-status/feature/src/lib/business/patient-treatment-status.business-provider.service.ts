
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePatientTreatmentStatusAction} from './actions/create-patient-treatment-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PatientTreatmentStatus, UserCreatePatientTreatmentStatusInput, UserUpdatePatientTreatmentStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePatientTreatmentStatusesAction, UpdatePatientTreatmentStatusAction } from './actions/update-patient-treatment-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PatientTreatmentStatusBusinessProviderService extends ServiceBase {constructor(
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
  
  importPatientTreatmentStatuses(patientTreatmentStatuses: UserUpdatePatientTreatmentStatusInput[]): Observable<boolean> {
    const updatePatientTreatmentStatusesAction = new UpdatePatientTreatmentStatusesAction(patientTreatmentStatuses);
    updatePatientTreatmentStatusesAction.Do(this)
    return updatePatientTreatmentStatusesAction.response;
  }
}

