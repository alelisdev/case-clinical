
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateManufacturerAction} from './actions/create-manufacturer.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Manufacturer, UserCreateManufacturerInput, UserUpdateManufacturerInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateManufacturersAction, UpdateManufacturerAction } from './actions/update-manufacturers.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ManufacturerBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ManufacturerBusinessProviderService', logger, serviceContext)
  }

  createManufacturer(input: UserCreateManufacturerInput): Observable<Manufacturer> {
    const action = new CreateManufacturerAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateManufacturer(input: UserUpdateManufacturerInput, manufacturerId: string): Observable<Manufacturer> {
    const action = new UpdateManufacturerAction(input, manufacturerId); 
    action.Do(this);
    return action.response;   
  }
  
  importManufacturers(manufacturers: UserUpdateManufacturerInput[]): Observable<boolean> {
    const updateManufacturersAction = new UpdateManufacturersAction(manufacturers);
    updateManufacturersAction.Do(this)
    return updateManufacturersAction.response;
  }
}

