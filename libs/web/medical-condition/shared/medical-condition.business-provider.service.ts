
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { MedicalCondition, UserCreateMedicalConditionInput, UserUpdateMedicalConditionInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateMedicalConditionExcelDataAction } from './actions/validate-medical-condition-excel-data.action'
import { CreateMedicalConditionAction } from './actions/create-medical-condition.action'
import { UpdateMedicalConditionsAction, UpdateMedicalConditionAction } from './actions/update-medical-conditions.action'


@Injectable({providedIn: 'root'})
export class MedicalConditionBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.MedicalConditionBusinessProviderService', logger, serviceContext)
  }

  createMedicalCondition(input: UserCreateMedicalConditionInput): Observable<MedicalCondition> {
    const action = new CreateMedicalConditionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateMedicalCondition(input: UserUpdateMedicalConditionInput, medicalConditionId: string): Observable<MedicalCondition> {
    const action = new UpdateMedicalConditionAction(input, medicalConditionId); 
    action.Do(this);
    return action.response;   
  }
  
  importMedicalConditions(medicalConditions: UserUpdateMedicalConditionInput[]): Observable<UpdateResult> {
    const updateMedicalConditionsAction = new UpdateMedicalConditionsAction(medicalConditions);
    updateMedicalConditionsAction.Do(this)
    return updateMedicalConditionsAction.response;
  }

  validateMedicalConditionExcelData(excelData: any[] ) {
    const validateMedicalConditionExcelDataAction = new ValidateMedicalConditionExcelDataAction(excelData );
    validateMedicalConditionExcelDataAction.Do(this)
    return validateMedicalConditionExcelDataAction.response;
  }
}

