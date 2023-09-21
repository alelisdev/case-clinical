
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CostCategory, UserCreateCostCategoryInput, UserUpdateCostCategoryInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCostCategoryExcelDataAction } from './actions/validate-cost-category-excel-data.action'
import { CreateCostCategoryAction } from './actions/create-cost-category.action'
import { UpdateCostCategoriesAction, UpdateCostCategoryAction } from './actions/update-cost-categories.action'


@Injectable({providedIn: 'root'})
export class CostCategoryBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importCostCategories(costCategories: UserUpdateCostCategoryInput[]): Observable<UpdateResult> {
    const updateCostCategoriesAction = new UpdateCostCategoriesAction(costCategories);
    updateCostCategoriesAction.Do(this)
    return updateCostCategoriesAction.response;
  }

  validateCostCategoryExcelData(excelData: any[] ) {
    const validateCostCategoryExcelDataAction = new ValidateCostCategoryExcelDataAction(excelData );
    validateCostCategoryExcelDataAction.Do(this)
    return validateCostCategoryExcelDataAction.response;
  }
}

