
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateLocationAction} from './actions/create-location.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Location, UserCreateLocationInput, UserUpdateLocationInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateLocationsAction, UpdateLocationAction } from './actions/update-locations.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class LocationBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LocationBusinessProviderService', logger, serviceContext)
  }

  createLocation(input: UserCreateLocationInput): Observable<Location> {
    const action = new CreateLocationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLocation(input: UserUpdateLocationInput, locationId: string): Observable<Location> {
    const action = new UpdateLocationAction(input, locationId); 
    action.Do(this);
    return action.response;   
  }
  
  importLocations(locations: UserUpdateLocationInput[]): Observable<boolean> {
    const updateLocationsAction = new UpdateLocationsAction(locations);
    updateLocationsAction.Do(this)
    return updateLocationsAction.response;
  }
}

