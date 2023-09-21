
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Location, UserCreateLocationInput, UserUpdateLocationInput, UpdateResult, PlaceOfService } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLocationExcelDataAction } from './actions/validate-location-excel-data.action'
import { CreateLocationAction } from './actions/create-location.action'
import { UpdateLocationsAction, UpdateLocationAction } from './actions/update-locations.action'


@Injectable({providedIn: 'root'})
export class LocationBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importLocations(locations: UserUpdateLocationInput[]): Observable<UpdateResult> {
    const updateLocationsAction = new UpdateLocationsAction(locations);
    updateLocationsAction.Do(this)
    return updateLocationsAction.response;
  }

  validateLocationExcelData(excelData: any[], placeOfServices: PlaceOfService[]) {
    const validateLocationExcelDataAction = new ValidateLocationExcelDataAction(excelData, placeOfServices);
    validateLocationExcelDataAction.Do(this)
    return validateLocationExcelDataAction.response;
  }
}

