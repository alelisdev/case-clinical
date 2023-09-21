
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { MedicalRecord, UserCreateMedicalRecordInput, UserUpdateMedicalRecordInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateMedicalRecordExcelDataAction } from './actions/validate-medical-record-excel-data.action'
import { CreateMedicalRecordAction } from './actions/create-medical-record.action'
import { UpdateMedicalRecordsAction, UpdateMedicalRecordAction } from './actions/update-medical-records.action'


@Injectable({providedIn: 'root'})
export class MedicalRecordBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.MedicalRecordBusinessProviderService', logger, serviceContext)
  }

  createMedicalRecord(input: UserCreateMedicalRecordInput): Observable<MedicalRecord> {
    const action = new CreateMedicalRecordAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateMedicalRecord(input: UserUpdateMedicalRecordInput, medicalRecordId: string): Observable<MedicalRecord> {
    const action = new UpdateMedicalRecordAction(input, medicalRecordId); 
    action.Do(this);
    return action.response;   
  }
  
  importMedicalRecords(medicalRecords: UserUpdateMedicalRecordInput[]): Observable<UpdateResult> {
    const updateMedicalRecordsAction = new UpdateMedicalRecordsAction(medicalRecords);
    updateMedicalRecordsAction.Do(this)
    return updateMedicalRecordsAction.response;
  }

  validateMedicalRecordExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateMedicalRecordExcelDataAction = new ValidateMedicalRecordExcelDataAction(excelData, clinicalProviders);
    validateMedicalRecordExcelDataAction.Do(this)
    return validateMedicalRecordExcelDataAction.response;
  }
}

