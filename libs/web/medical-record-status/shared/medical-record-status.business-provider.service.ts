
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { MedicalRecordStatus, UserCreateMedicalRecordStatusInput, UserUpdateMedicalRecordStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateMedicalRecordStatusExcelDataAction } from './actions/validate-medical-record-status-excel-data.action'
import { CreateMedicalRecordStatusAction } from './actions/create-medical-record-status.action'
import { UpdateMedicalRecordStatusesAction, UpdateMedicalRecordStatusAction } from './actions/update-medical-record-statuses.action'


@Injectable({providedIn: 'root'})
export class MedicalRecordStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.MedicalRecordStatusBusinessProviderService', logger, serviceContext)
  }

  createMedicalRecordStatus(input: UserCreateMedicalRecordStatusInput): Observable<MedicalRecordStatus> {
    const action = new CreateMedicalRecordStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateMedicalRecordStatus(input: UserUpdateMedicalRecordStatusInput, medicalRecordStatusId: string): Observable<MedicalRecordStatus> {
    const action = new UpdateMedicalRecordStatusAction(input, medicalRecordStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importMedicalRecordStatuses(medicalRecordStatuses: UserUpdateMedicalRecordStatusInput[]): Observable<UpdateResult> {
    const updateMedicalRecordStatusesAction = new UpdateMedicalRecordStatusesAction(medicalRecordStatuses);
    updateMedicalRecordStatusesAction.Do(this)
    return updateMedicalRecordStatusesAction.response;
  }

  validateMedicalRecordStatusExcelData(excelData: any[] ) {
    const validateMedicalRecordStatusExcelDataAction = new ValidateMedicalRecordStatusExcelDataAction(excelData );
    validateMedicalRecordStatusExcelDataAction.Do(this)
    return validateMedicalRecordStatusExcelDataAction.response;
  }
}

