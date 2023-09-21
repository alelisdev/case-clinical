
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Prescription, UserCreatePrescriptionInput, UserUpdatePrescriptionInput, UpdateResult, Patient, Document } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePrescriptionExcelDataAction } from './actions/validate-prescription-excel-data.action'
import { CreatePrescriptionAction } from './actions/create-prescription.action'
import { UpdatePrescriptionsAction, UpdatePrescriptionAction } from './actions/update-prescriptions.action'


@Injectable({providedIn: 'root'})
export class PrescriptionBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPrescriptions(prescriptions: UserUpdatePrescriptionInput[]): Observable<UpdateResult> {
    const updatePrescriptionsAction = new UpdatePrescriptionsAction(prescriptions);
    updatePrescriptionsAction.Do(this)
    return updatePrescriptionsAction.response;
  }

  validatePrescriptionExcelData(excelData: any[], patients: Patient[], documents: Document[]) {
    const validatePrescriptionExcelDataAction = new ValidatePrescriptionExcelDataAction(excelData, patients, documents);
    validatePrescriptionExcelDataAction.Do(this)
    return validatePrescriptionExcelDataAction.response;
  }
}

