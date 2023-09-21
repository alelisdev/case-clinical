
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Vendor, UserCreateVendorInput, UserUpdateVendorInput, UpdateResult, VendorType } from "@case-clinical/shared/util/sdk";
import { VendorBusinessProviderService } from "./vendor.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class VendorService extends ServiceBase {
 constructor(
  @Inject(VendorBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: VendorBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("VendorService", loggingService, serviceContext);
 }

    createVendor(input: UserCreateVendorInput): Observable<Vendor> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createVendor(filteredObj);
    }

    updateVendor(input: UserUpdateVendorInput, vendorId: string): Observable<Vendor> {
        return this.businessProvider.updateVendor(input, vendorId);
    }

    importVendors(vendors: UserUpdateVendorInput[]): Observable<UpdateResult> {
        return this.businessProvider.importVendors(vendors);
    }

    validateVendorExcelData(excelData: any[], vendorTypes: VendorType[]) {
      return this.businessProvider.validateVendorExcelData(excelData, vendorTypes);
    }
}

