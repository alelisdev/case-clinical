
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ImplantCategory, UserCreateImplantCategoryInput, UserUpdateImplantCategoryInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateImplantCategoryExcelDataAction } from './actions/validate-implant-category-excel-data.action'
import { CreateImplantCategoryAction } from './actions/create-implant-category.action'
import { UpdateImplantCategoriesAction, UpdateImplantCategoryAction } from './actions/update-implant-categories.action'


@Injectable({providedIn: 'root'})
export class ImplantCategoryBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importImplantCategories(implantCategories: UserUpdateImplantCategoryInput[]): Observable<UpdateResult> {
    const updateImplantCategoriesAction = new UpdateImplantCategoriesAction(implantCategories);
    updateImplantCategoriesAction.Do(this)
    return updateImplantCategoriesAction.response;
  }

  validateImplantCategoryExcelData(excelData: any[] ) {
    const validateImplantCategoryExcelDataAction = new ValidateImplantCategoryExcelDataAction(excelData );
    validateImplantCategoryExcelDataAction.Do(this)
    return validateImplantCategoryExcelDataAction.response;
  }
}

