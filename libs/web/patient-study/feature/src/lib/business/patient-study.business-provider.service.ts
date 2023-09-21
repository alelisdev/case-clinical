
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePatientStudyAction} from './actions/create-patient-study.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PatientStudy, UserCreatePatientStudyInput, UserUpdatePatientStudyInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePatientStudiesAction, UpdatePatientStudyAction } from './actions/update-patient-studies.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PatientStudyBusinessProviderService extends ServiceBase {constructor(
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
  
  importPatientStudies(patientStudies: UserUpdatePatientStudyInput[]): Observable<boolean> {
    const updatePatientStudiesAction = new UpdatePatientStudiesAction(patientStudies);
    updatePatientStudiesAction.Do(this)
    return updatePatientStudiesAction.response;
  }
}

