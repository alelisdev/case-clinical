
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { VendorType, UserCreateVendorTypeInput, UserUpdateVendorTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { VendorTypeBusinessProviderService } from "./vendor-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class VendorTypeService extends ServiceBase {
 constructor(
  @Inject(VendorTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: VendorTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("VendorTypeService", loggingService, serviceContext);
 }

    createVendorType(input: UserCreateVendorTypeInput): Observable<VendorType> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createVendorType(filteredObj);
    }

    updateVendorType(input: UserUpdateVendorTypeInput, vendorTypeId: string): Observable<VendorType> {
        return this.businessProvider.updateVendorType(input, vendorTypeId);
    }

    importVendorTypes(vendorTypes: UserUpdateVendorTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importVendorTypes(vendorTypes);
    }

    validateVendorTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateVendorTypeExcelData(excelData );
    }
}

