
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RecommendedOrderAuthorization, UserCreateRecommendedOrderAuthorizationInput, UserUpdateRecommendedOrderAuthorizationInput, UpdateResult, Authorization, RecommendedOrder } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRecommendedOrderAuthorizationExcelDataAction } from './actions/validate-recommended-order-authorization-excel-data.action'
import { CreateRecommendedOrderAuthorizationAction } from './actions/create-recommended-order-authorization.action'
import { UpdateRecommendedOrderAuthorizationsAction, UpdateRecommendedOrderAuthorizationAction } from './actions/update-recommended-order-authorizations.action'


@Injectable({providedIn: 'root'})
export class RecommendedOrderAuthorizationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RecommendedOrderAuthorizationBusinessProviderService', logger, serviceContext)
  }

  createRecommendedOrderAuthorization(input: UserCreateRecommendedOrderAuthorizationInput): Observable<RecommendedOrderAuthorization> {
    const action = new CreateRecommendedOrderAuthorizationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRecommendedOrderAuthorization(input: UserUpdateRecommendedOrderAuthorizationInput, recommendedOrderAuthorizationId: string): Observable<RecommendedOrderAuthorization> {
    const action = new UpdateRecommendedOrderAuthorizationAction(input, recommendedOrderAuthorizationId); 
    action.Do(this);
    return action.response;   
  }
  
  importRecommendedOrderAuthorizations(recommendedOrderAuthorizations: UserUpdateRecommendedOrderAuthorizationInput[]): Observable<UpdateResult> {
    const updateRecommendedOrderAuthorizationsAction = new UpdateRecommendedOrderAuthorizationsAction(recommendedOrderAuthorizations);
    updateRecommendedOrderAuthorizationsAction.Do(this)
    return updateRecommendedOrderAuthorizationsAction.response;
  }

  validateRecommendedOrderAuthorizationExcelData(excelData: any[], authorizations: Authorization[], recommendedOrders: RecommendedOrder[]) {
    const validateRecommendedOrderAuthorizationExcelDataAction = new ValidateRecommendedOrderAuthorizationExcelDataAction(excelData, authorizations, recommendedOrders);
    validateRecommendedOrderAuthorizationExcelDataAction.Do(this)
    return validateRecommendedOrderAuthorizationExcelDataAction.response;
  }
}

