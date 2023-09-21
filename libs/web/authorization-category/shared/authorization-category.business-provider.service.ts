
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AuthorizationCategory, UserCreateAuthorizationCategoryInput, UserUpdateAuthorizationCategoryInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAuthorizationCategoryExcelDataAction } from './actions/validate-authorization-category-excel-data.action'
import { CreateAuthorizationCategoryAction } from './actions/create-authorization-category.action'
import { UpdateAuthorizationCategoriesAction, UpdateAuthorizationCategoryAction } from './actions/update-authorization-categories.action'


@Injectable({providedIn: 'root'})
export class AuthorizationCategoryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationCategoryBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationCategory(input: UserCreateAuthorizationCategoryInput): Observable<AuthorizationCategory> {
    const action = new CreateAuthorizationCategoryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationCategory(input: UserUpdateAuthorizationCategoryInput, authorizationCategoryId: string): Observable<AuthorizationCategory> {
    const action = new UpdateAuthorizationCategoryAction(input, authorizationCategoryId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationCategories(authorizationCategories: UserUpdateAuthorizationCategoryInput[]): Observable<UpdateResult> {
    const updateAuthorizationCategoriesAction = new UpdateAuthorizationCategoriesAction(authorizationCategories);
    updateAuthorizationCategoriesAction.Do(this)
    return updateAuthorizationCategoriesAction.response;
  }

  validateAuthorizationCategoryExcelData(excelData: any[] ) {
    const validateAuthorizationCategoryExcelDataAction = new ValidateAuthorizationCategoryExcelDataAction(excelData );
    validateAuthorizationCategoryExcelDataAction.Do(this)
    return validateAuthorizationCategoryExcelDataAction.response;
  }
}

