
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateImplantCategoryAction} from './actions/create-implant-category.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ImplantCategory, UserCreateImplantCategoryInput, UserUpdateImplantCategoryInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateImplantCategoriesAction, UpdateImplantCategoryAction } from './actions/update-implant-categories.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ImplantCategoryBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ImplantCategoryBusinessProviderService', logger, serviceContext)
  }

  createImplantCategory(input: UserCreateImplantCategoryInput): Observable<ImplantCategory> {
    const action = new CreateImplantCategoryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateImplantCategory(input: UserUpdateImplantCategoryInput, implantCategoryId: string): Observable<ImplantCategory> {
    const action = new UpdateImplantCategoryAction(input, implantCategoryId); 
    action.Do(this);
    return action.response;   
  }
  
  importImplantCategories(implantCategories: UserUpdateImplantCategoryInput[]): Observable<boolean> {
    const updateImplantCategoriesAction = new UpdateImplantCategoriesAction(implantCategories);
    updateImplantCategoriesAction.Do(this)
    return updateImplantCategoriesAction.response;
  }
}

