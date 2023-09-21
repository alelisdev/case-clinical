
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Authorization, UserCreateAuthorizationInput, UserUpdateAuthorizationInput, UpdateResult, Vendor, AuthorizationCategory, AuthorizationType, Procedure } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAuthorizationExcelDataAction } from './actions/validate-authorization-excel-data.action'
import { CreateAuthorizationAction } from './actions/create-authorization.action'
import { UpdateAuthorizationsAction, UpdateAuthorizationAction } from './actions/update-authorizations.action'


@Injectable({providedIn: 'root'})
export class AuthorizationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationBusinessProviderService', logger, serviceContext)
  }

  createAuthorization(input: UserCreateAuthorizationInput): Observable<Authorization> {
    const action = new CreateAuthorizationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorization(input: UserUpdateAuthorizationInput, authorizationId: string): Observable<Authorization> {
    const action = new UpdateAuthorizationAction(input, authorizationId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizations(authorizations: UserUpdateAuthorizationInput[]): Observable<UpdateResult> {
    const updateAuthorizationsAction = new UpdateAuthorizationsAction(authorizations);
    updateAuthorizationsAction.Do(this)
    return updateAuthorizationsAction.response;
  }

  validateAuthorizationExcelData(excelData: any[], vendors: Vendor[], authorizationCategories: AuthorizationCategory[], authorizationTypes: AuthorizationType[], procedures: Procedure[]) {
    const validateAuthorizationExcelDataAction = new ValidateAuthorizationExcelDataAction(excelData, vendors, authorizationCategories, authorizationTypes, procedures);
    validateAuthorizationExcelDataAction.Do(this)
    return validateAuthorizationExcelDataAction.response;
  }
}

