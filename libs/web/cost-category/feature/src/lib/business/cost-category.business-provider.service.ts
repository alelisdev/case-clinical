
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCostCategoryAction} from './actions/create-cost-category.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CostCategory, UserCreateCostCategoryInput, UserUpdateCostCategoryInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCostCategoriesAction, UpdateCostCategoryAction } from './actions/update-cost-categories.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CostCategoryBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CostCategoryBusinessProviderService', logger, serviceContext)
  }

  createCostCategory(input: UserCreateCostCategoryInput): Observable<CostCategory> {
    const action = new CreateCostCategoryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCostCategory(input: UserUpdateCostCategoryInput, costCategoryId: string): Observable<CostCategory> {
    const action = new UpdateCostCategoryAction(input, costCategoryId); 
    action.Do(this);
    return action.response;   
  }
  
  importCostCategories(costCategories: UserUpdateCostCategoryInput[]): Observable<boolean> {
    const updateCostCategoriesAction = new UpdateCostCategoriesAction(costCategories);
    updateCostCategoriesAction.Do(this)
    return updateCostCategoriesAction.response;
  }
}

