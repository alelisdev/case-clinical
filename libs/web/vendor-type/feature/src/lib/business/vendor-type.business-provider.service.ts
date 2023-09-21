
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateVendorTypeAction} from './actions/create-vendor-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {VendorType, UserCreateVendorTypeInput, UserUpdateVendorTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateVendorTypesAction, UpdateVendorTypeAction } from './actions/update-vendor-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class VendorTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.VendorTypeBusinessProviderService', logger, serviceContext)
  }

  createVendorType(input: UserCreateVendorTypeInput): Observable<VendorType> {
    const action = new CreateVendorTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateVendorType(input: UserUpdateVendorTypeInput, vendorTypeId: string): Observable<VendorType> {
    const action = new UpdateVendorTypeAction(input, vendorTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importVendorTypes(vendorTypes: UserUpdateVendorTypeInput[]): Observable<boolean> {
    const updateVendorTypesAction = new UpdateVendorTypesAction(vendorTypes);
    updateVendorTypesAction.Do(this)
    return updateVendorTypesAction.response;
  }
}

