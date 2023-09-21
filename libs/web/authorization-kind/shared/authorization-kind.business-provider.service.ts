
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AuthorizationKind, UserCreateAuthorizationKindInput, UserUpdateAuthorizationKindInput, UpdateResult, Category } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAuthorizationKindExcelDataAction } from './actions/validate-authorization-kind-excel-data.action'
import { CreateAuthorizationKindAction } from './actions/create-authorization-kind.action'
import { UpdateAuthorizationKindsAction, UpdateAuthorizationKindAction } from './actions/update-authorization-kinds.action'


@Injectable({providedIn: 'root'})
export class AuthorizationKindBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationKindBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationKind(input: UserCreateAuthorizationKindInput): Observable<AuthorizationKind> {
    const action = new CreateAuthorizationKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationKind(input: UserUpdateAuthorizationKindInput, authorizationKindId: string): Observable<AuthorizationKind> {
    const action = new UpdateAuthorizationKindAction(input, authorizationKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationKinds(authorizationKinds: UserUpdateAuthorizationKindInput[]): Observable<UpdateResult> {
    const updateAuthorizationKindsAction = new UpdateAuthorizationKindsAction(authorizationKinds);
    updateAuthorizationKindsAction.Do(this)
    return updateAuthorizationKindsAction.response;
  }

  validateAuthorizationKindExcelData(excelData: any[], categories: Category[]) {
    const validateAuthorizationKindExcelDataAction = new ValidateAuthorizationKindExcelDataAction(excelData, categories);
    validateAuthorizationKindExcelDataAction.Do(this)
    return validateAuthorizationKindExcelDataAction.response;
  }
}

