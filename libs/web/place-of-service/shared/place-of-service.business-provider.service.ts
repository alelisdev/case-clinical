
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PlaceOfService, UserCreatePlaceOfServiceInput, UserUpdatePlaceOfServiceInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePlaceOfServiceExcelDataAction } from './actions/validate-place-of-service-excel-data.action'
import { CreatePlaceOfServiceAction } from './actions/create-place-of-service.action'
import { UpdatePlaceOfServicesAction, UpdatePlaceOfServiceAction } from './actions/update-place-of-services.action'


@Injectable({providedIn: 'root'})
export class PlaceOfServiceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PlaceOfServiceBusinessProviderService', logger, serviceContext)
  }

  createPlaceOfService(input: UserCreatePlaceOfServiceInput): Observable<PlaceOfService> {
    const action = new CreatePlaceOfServiceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePlaceOfService(input: UserUpdatePlaceOfServiceInput, placeOfServiceId: string): Observable<PlaceOfService> {
    const action = new UpdatePlaceOfServiceAction(input, placeOfServiceId); 
    action.Do(this);
    return action.response;   
  }
  
  importPlaceOfServices(placeOfServices: UserUpdatePlaceOfServiceInput[]): Observable<UpdateResult> {
    const updatePlaceOfServicesAction = new UpdatePlaceOfServicesAction(placeOfServices);
    updatePlaceOfServicesAction.Do(this)
    return updatePlaceOfServicesAction.response;
  }

  validatePlaceOfServiceExcelData(excelData: any[] ) {
    const validatePlaceOfServiceExcelDataAction = new ValidatePlaceOfServiceExcelDataAction(excelData );
    validatePlaceOfServiceExcelDataAction.Do(this)
    return validatePlaceOfServiceExcelDataAction.response;
  }
}

