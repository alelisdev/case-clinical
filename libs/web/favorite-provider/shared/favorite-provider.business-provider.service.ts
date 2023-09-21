
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { FavoriteProvider, UserCreateFavoriteProviderInput, UserUpdateFavoriteProviderInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateFavoriteProviderExcelDataAction } from './actions/validate-favorite-provider-excel-data.action'
import { CreateFavoriteProviderAction } from './actions/create-favorite-provider.action'
import { UpdateFavoriteProvidersAction, UpdateFavoriteProviderAction } from './actions/update-favorite-providers.action'


@Injectable({providedIn: 'root'})
export class FavoriteProviderBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FavoriteProviderBusinessProviderService', logger, serviceContext)
  }

  createFavoriteProvider(input: UserCreateFavoriteProviderInput): Observable<FavoriteProvider> {
    const action = new CreateFavoriteProviderAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateFavoriteProvider(input: UserUpdateFavoriteProviderInput, favoriteProviderId: string): Observable<FavoriteProvider> {
    const action = new UpdateFavoriteProviderAction(input, favoriteProviderId); 
    action.Do(this);
    return action.response;   
  }
  
  importFavoriteProviders(favoriteProviders: UserUpdateFavoriteProviderInput[]): Observable<UpdateResult> {
    const updateFavoriteProvidersAction = new UpdateFavoriteProvidersAction(favoriteProviders);
    updateFavoriteProvidersAction.Do(this)
    return updateFavoriteProvidersAction.response;
  }

  validateFavoriteProviderExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateFavoriteProviderExcelDataAction = new ValidateFavoriteProviderExcelDataAction(excelData, clinicalProviders);
    validateFavoriteProviderExcelDataAction.Do(this)
    return validateFavoriteProviderExcelDataAction.response;
  }
}

