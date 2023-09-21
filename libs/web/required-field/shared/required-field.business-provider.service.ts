
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RequiredField, UserCreateRequiredFieldInput, UserUpdateRequiredFieldInput, UpdateResult, AccidentType, MedLevel } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRequiredFieldExcelDataAction } from './actions/validate-required-field-excel-data.action'
import { CreateRequiredFieldAction } from './actions/create-required-field.action'
import { UpdateRequiredFieldsAction, UpdateRequiredFieldAction } from './actions/update-required-fields.action'


@Injectable({providedIn: 'root'})
export class RequiredFieldBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RequiredFieldBusinessProviderService', logger, serviceContext)
  }

  createRequiredField(input: UserCreateRequiredFieldInput): Observable<RequiredField> {
    const action = new CreateRequiredFieldAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRequiredField(input: UserUpdateRequiredFieldInput, requiredFieldId: string): Observable<RequiredField> {
    const action = new UpdateRequiredFieldAction(input, requiredFieldId); 
    action.Do(this);
    return action.response;   
  }
  
  importRequiredFields(requiredFields: UserUpdateRequiredFieldInput[]): Observable<UpdateResult> {
    const updateRequiredFieldsAction = new UpdateRequiredFieldsAction(requiredFields);
    updateRequiredFieldsAction.Do(this)
    return updateRequiredFieldsAction.response;
  }

  validateRequiredFieldExcelData(excelData: any[], accidentTypes: AccidentType[], medLevels: MedLevel[]) {
    const validateRequiredFieldExcelDataAction = new ValidateRequiredFieldExcelDataAction(excelData, accidentTypes, medLevels);
    validateRequiredFieldExcelDataAction.Do(this)
    return validateRequiredFieldExcelDataAction.response;
  }
}

