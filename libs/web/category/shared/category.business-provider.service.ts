
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Category, UserCreateCategoryInput, UserUpdateCategoryInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCategoryExcelDataAction } from './actions/validate-category-excel-data.action'
import { CreateCategoryAction } from './actions/create-category.action'
import { UpdateCategoriesAction, UpdateCategoryAction } from './actions/update-categories.action'


@Injectable({providedIn: 'root'})
export class CategoryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CategoryBusinessProviderService', logger, serviceContext)
  }

  createCategory(input: UserCreateCategoryInput): Observable<Category> {
    const action = new CreateCategoryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCategory(input: UserUpdateCategoryInput, categoryId: string): Observable<Category> {
    const action = new UpdateCategoryAction(input, categoryId); 
    action.Do(this);
    return action.response;   
  }
  
  importCategories(categories: UserUpdateCategoryInput[]): Observable<UpdateResult> {
    const updateCategoriesAction = new UpdateCategoriesAction(categories);
    updateCategoriesAction.Do(this)
    return updateCategoriesAction.response;
  }

  validateCategoryExcelData(excelData: any[] ) {
    const validateCategoryExcelDataAction = new ValidateCategoryExcelDataAction(excelData );
    validateCategoryExcelDataAction.Do(this)
    return validateCategoryExcelDataAction.response;
  }
}

