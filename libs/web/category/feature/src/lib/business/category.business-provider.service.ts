
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCategoryAction} from './actions/create-category.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Category, UserCreateCategoryInput, UserUpdateCategoryInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCategoriesAction, UpdateCategoryAction } from './actions/update-categories.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CategoryBusinessProviderService extends ServiceBase {constructor(
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
  
  importCategories(categories: UserUpdateCategoryInput[]): Observable<boolean> {
    const updateCategoriesAction = new UpdateCategoriesAction(categories);
    updateCategoriesAction.Do(this)
    return updateCategoriesAction.response;
  }
}

