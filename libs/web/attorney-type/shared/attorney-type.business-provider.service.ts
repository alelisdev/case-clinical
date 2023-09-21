
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AttorneyType, UserCreateAttorneyTypeInput, UserUpdateAttorneyTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAttorneyTypeExcelDataAction } from './actions/validate-attorney-type-excel-data.action'
import { CreateAttorneyTypeAction } from './actions/create-attorney-type.action'
import { UpdateAttorneyTypesAction, UpdateAttorneyTypeAction } from './actions/update-attorney-types.action'


@Injectable({providedIn: 'root'})
export class AttorneyTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AttorneyTypeBusinessProviderService', logger, serviceContext)
  }

  createAttorneyType(input: UserCreateAttorneyTypeInput): Observable<AttorneyType> {
    const action = new CreateAttorneyTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAttorneyType(input: UserUpdateAttorneyTypeInput, attorneyTypeId: string): Observable<AttorneyType> {
    const action = new UpdateAttorneyTypeAction(input, attorneyTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAttorneyTypes(attorneyTypes: UserUpdateAttorneyTypeInput[]): Observable<UpdateResult> {
    const updateAttorneyTypesAction = new UpdateAttorneyTypesAction(attorneyTypes);
    updateAttorneyTypesAction.Do(this)
    return updateAttorneyTypesAction.response;
  }

  validateAttorneyTypeExcelData(excelData: any[] ) {
    const validateAttorneyTypeExcelDataAction = new ValidateAttorneyTypeExcelDataAction(excelData );
    validateAttorneyTypeExcelDataAction.Do(this)
    return validateAttorneyTypeExcelDataAction.response;
  }
}

