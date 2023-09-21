
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePlaceOfServiceAction} from './actions/create-place-of-service.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PlaceOfService, UserCreatePlaceOfServiceInput, UserUpdatePlaceOfServiceInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePlaceOfServicesAction, UpdatePlaceOfServiceAction } from './actions/update-place-of-services.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PlaceOfServiceBusinessProviderService extends ServiceBase {constructor(
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
  
  importPlaceOfServices(placeOfServices: UserUpdatePlaceOfServiceInput[]): Observable<boolean> {
    const updatePlaceOfServicesAction = new UpdatePlaceOfServicesAction(placeOfServices);
    updatePlaceOfServicesAction.Do(this)
    return updatePlaceOfServicesAction.response;
  }
}

