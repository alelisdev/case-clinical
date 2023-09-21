
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RecommendedOrder, UserCreateRecommendedOrderInput, UserUpdateRecommendedOrderInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRecommendedOrderExcelDataAction } from './actions/validate-recommended-order-excel-data.action'
import { CreateRecommendedOrderAction } from './actions/create-recommended-order.action'
import { UpdateRecommendedOrdersAction, UpdateRecommendedOrderAction } from './actions/update-recommended-orders.action'


@Injectable({providedIn: 'root'})
export class RecommendedOrderBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RecommendedOrderBusinessProviderService', logger, serviceContext)
  }

  createRecommendedOrder(input: UserCreateRecommendedOrderInput): Observable<RecommendedOrder> {
    const action = new CreateRecommendedOrderAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRecommendedOrder(input: UserUpdateRecommendedOrderInput, recommendedOrderId: string): Observable<RecommendedOrder> {
    const action = new UpdateRecommendedOrderAction(input, recommendedOrderId); 
    action.Do(this);
    return action.response;   
  }
  
  importRecommendedOrders(recommendedOrders: UserUpdateRecommendedOrderInput[]): Observable<UpdateResult> {
    const updateRecommendedOrdersAction = new UpdateRecommendedOrdersAction(recommendedOrders);
    updateRecommendedOrdersAction.Do(this)
    return updateRecommendedOrdersAction.response;
  }

  validateRecommendedOrderExcelData(excelData: any[] ) {
    const validateRecommendedOrderExcelDataAction = new ValidateRecommendedOrderExcelDataAction(excelData );
    validateRecommendedOrderExcelDataAction.Do(this)
    return validateRecommendedOrderExcelDataAction.response;
  }
}

