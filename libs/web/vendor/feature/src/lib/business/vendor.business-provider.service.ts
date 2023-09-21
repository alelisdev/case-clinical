
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateVendorAction} from './actions/create-vendor.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Vendor, UserCreateVendorInput, UserUpdateVendorInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateVendorsAction, UpdateVendorAction } from './actions/update-vendors.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class VendorBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.VendorBusinessProviderService', logger, serviceContext)
  }

  createVendor(input: UserCreateVendorInput): Observable<Vendor> {
    const action = new CreateVendorAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateVendor(input: UserUpdateVendorInput, vendorId: string): Observable<Vendor> {
    const action = new UpdateVendorAction(input, vendorId); 
    action.Do(this);
    return action.response;   
  }
  
  importVendors(vendors: UserUpdateVendorInput[]): Observable<boolean> {
    const updateVendorsAction = new UpdateVendorsAction(vendors);
    updateVendorsAction.Do(this)
    return updateVendorsAction.response;
  }
}

