
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { VendorType, UserCreateVendorTypeInput, UserUpdateVendorTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateVendorTypeExcelDataAction } from './actions/validate-vendor-type-excel-data.action'
import { CreateVendorTypeAction } from './actions/create-vendor-type.action'
import { UpdateVendorTypesAction, UpdateVendorTypeAction } from './actions/update-vendor-types.action'


@Injectable({providedIn: 'root'})
export class VendorTypeBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importVendorTypes(vendorTypes: UserUpdateVendorTypeInput[]): Observable<UpdateResult> {
    const updateVendorTypesAction = new UpdateVendorTypesAction(vendorTypes);
    updateVendorTypesAction.Do(this)
    return updateVendorTypesAction.response;
  }

  validateVendorTypeExcelData(excelData: any[] ) {
    const validateVendorTypeExcelDataAction = new ValidateVendorTypeExcelDataAction(excelData );
    validateVendorTypeExcelDataAction.Do(this)
    return validateVendorTypeExcelDataAction.response;
  }
}

