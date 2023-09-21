
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AuthorizationType, UserCreateAuthorizationTypeInput, UserUpdateAuthorizationTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAuthorizationTypeExcelDataAction } from './actions/validate-authorization-type-excel-data.action'
import { CreateAuthorizationTypeAction } from './actions/create-authorization-type.action'
import { UpdateAuthorizationTypesAction, UpdateAuthorizationTypeAction } from './actions/update-authorization-types.action'


@Injectable({providedIn: 'root'})
export class AuthorizationTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationTypeBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationType(input: UserCreateAuthorizationTypeInput): Observable<AuthorizationType> {
    const action = new CreateAuthorizationTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationType(input: UserUpdateAuthorizationTypeInput, authorizationTypeId: string): Observable<AuthorizationType> {
    const action = new UpdateAuthorizationTypeAction(input, authorizationTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationTypes(authorizationTypes: UserUpdateAuthorizationTypeInput[]): Observable<UpdateResult> {
    const updateAuthorizationTypesAction = new UpdateAuthorizationTypesAction(authorizationTypes);
    updateAuthorizationTypesAction.Do(this)
    return updateAuthorizationTypesAction.response;
  }

  validateAuthorizationTypeExcelData(excelData: any[] ) {
    const validateAuthorizationTypeExcelDataAction = new ValidateAuthorizationTypeExcelDataAction(excelData );
    validateAuthorizationTypeExcelDataAction.Do(this)
    return validateAuthorizationTypeExcelDataAction.response;
  }
}

