
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Vendor, UserCreateVendorInput, UserUpdateVendorInput, UpdateResult, VendorType } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateVendorExcelDataAction } from './actions/validate-vendor-excel-data.action'
import { CreateVendorAction } from './actions/create-vendor.action'
import { UpdateVendorsAction, UpdateVendorAction } from './actions/update-vendors.action'


@Injectable({providedIn: 'root'})
export class VendorBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importVendors(vendors: UserUpdateVendorInput[]): Observable<UpdateResult> {
    const updateVendorsAction = new UpdateVendorsAction(vendors);
    updateVendorsAction.Do(this)
    return updateVendorsAction.response;
  }

  validateVendorExcelData(excelData: any[], vendorTypes: VendorType[]) {
    const validateVendorExcelDataAction = new ValidateVendorExcelDataAction(excelData, vendorTypes);
    validateVendorExcelDataAction.Do(this)
    return validateVendorExcelDataAction.response;
  }
}

