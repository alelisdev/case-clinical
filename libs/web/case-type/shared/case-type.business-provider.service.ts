
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CaseType, UserCreateCaseTypeInput, UserUpdateCaseTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCaseTypeExcelDataAction } from './actions/validate-case-type-excel-data.action'
import { CreateCaseTypeAction } from './actions/create-case-type.action'
import { UpdateCaseTypesAction, UpdateCaseTypeAction } from './actions/update-case-types.action'


@Injectable({providedIn: 'root'})
export class CaseTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseTypeBusinessProviderService', logger, serviceContext)
  }

  createCaseType(input: UserCreateCaseTypeInput): Observable<CaseType> {
    const action = new CreateCaseTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseType(input: UserUpdateCaseTypeInput, caseTypeId: string): Observable<CaseType> {
    const action = new UpdateCaseTypeAction(input, caseTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseTypes(caseTypes: UserUpdateCaseTypeInput[]): Observable<UpdateResult> {
    const updateCaseTypesAction = new UpdateCaseTypesAction(caseTypes);
    updateCaseTypesAction.Do(this)
    return updateCaseTypesAction.response;
  }

  validateCaseTypeExcelData(excelData: any[] ) {
    const validateCaseTypeExcelDataAction = new ValidateCaseTypeExcelDataAction(excelData );
    validateCaseTypeExcelDataAction.Do(this)
    return validateCaseTypeExcelDataAction.response;
  }
}

