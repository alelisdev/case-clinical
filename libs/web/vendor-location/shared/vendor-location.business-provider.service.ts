
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { VendorLocation, UserCreateVendorLocationInput, UserUpdateVendorLocationInput, UpdateResult, Location, Vendor } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateVendorLocationExcelDataAction } from './actions/validate-vendor-location-excel-data.action'
import { CreateVendorLocationAction } from './actions/create-vendor-location.action'
import { UpdateVendorLocationsAction, UpdateVendorLocationAction } from './actions/update-vendor-locations.action'


@Injectable({providedIn: 'root'})
export class VendorLocationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.VendorLocationBusinessProviderService', logger, serviceContext)
  }

  createVendorLocation(input: UserCreateVendorLocationInput): Observable<VendorLocation> {
    const action = new CreateVendorLocationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateVendorLocation(input: UserUpdateVendorLocationInput, vendorLocationId: string): Observable<VendorLocation> {
    const action = new UpdateVendorLocationAction(input, vendorLocationId); 
    action.Do(this);
    return action.response;   
  }
  
  importVendorLocations(vendorLocations: UserUpdateVendorLocationInput[]): Observable<UpdateResult> {
    const updateVendorLocationsAction = new UpdateVendorLocationsAction(vendorLocations);
    updateVendorLocationsAction.Do(this)
    return updateVendorLocationsAction.response;
  }

  validateVendorLocationExcelData(excelData: any[], locations: Location[], vendors: Vendor[]) {
    const validateVendorLocationExcelDataAction = new ValidateVendorLocationExcelDataAction(excelData, locations, vendors);
    validateVendorLocationExcelDataAction.Do(this)
    return validateVendorLocationExcelDataAction.response;
  }
}

