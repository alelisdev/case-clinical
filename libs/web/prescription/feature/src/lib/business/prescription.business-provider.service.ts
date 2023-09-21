
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePrescriptionAction} from './actions/create-prescription.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Prescription, UserCreatePrescriptionInput, UserUpdatePrescriptionInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePrescriptionsAction, UpdatePrescriptionAction } from './actions/update-prescriptions.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PrescriptionBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PrescriptionBusinessProviderService', logger, serviceContext)
  }

  createPrescription(input: UserCreatePrescriptionInput): Observable<Prescription> {
    const action = new CreatePrescriptionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePrescription(input: UserUpdatePrescriptionInput, prescriptionId: string): Observable<Prescription> {
    const action = new UpdatePrescriptionAction(input, prescriptionId); 
    action.Do(this);
    return action.response;   
  }
  
  importPrescriptions(prescriptions: UserUpdatePrescriptionInput[]): Observable<boolean> {
    const updatePrescriptionsAction = new UpdatePrescriptionsAction(prescriptions);
    updatePrescriptionsAction.Do(this)
    return updatePrescriptionsAction.response;
  }
}

