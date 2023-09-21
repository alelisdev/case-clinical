
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AuthorizationStatus, UserCreateAuthorizationStatusInput, UserUpdateAuthorizationStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAuthorizationStatusExcelDataAction } from './actions/validate-authorization-status-excel-data.action'
import { CreateAuthorizationStatusAction } from './actions/create-authorization-status.action'
import { UpdateAuthorizationStatusesAction, UpdateAuthorizationStatusAction } from './actions/update-authorization-statuses.action'


@Injectable({providedIn: 'root'})
export class AuthorizationStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationStatusBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationStatus(input: UserCreateAuthorizationStatusInput): Observable<AuthorizationStatus> {
    const action = new CreateAuthorizationStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationStatus(input: UserUpdateAuthorizationStatusInput, authorizationStatusId: string): Observable<AuthorizationStatus> {
    const action = new UpdateAuthorizationStatusAction(input, authorizationStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationStatuses(authorizationStatuses: UserUpdateAuthorizationStatusInput[]): Observable<UpdateResult> {
    const updateAuthorizationStatusesAction = new UpdateAuthorizationStatusesAction(authorizationStatuses);
    updateAuthorizationStatusesAction.Do(this)
    return updateAuthorizationStatusesAction.response;
  }

  validateAuthorizationStatusExcelData(excelData: any[] ) {
    const validateAuthorizationStatusExcelDataAction = new ValidateAuthorizationStatusExcelDataAction(excelData );
    validateAuthorizationStatusExcelDataAction.Do(this)
    return validateAuthorizationStatusExcelDataAction.response;
  }
}

