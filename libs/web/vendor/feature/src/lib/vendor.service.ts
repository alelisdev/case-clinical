
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Vendor, UserCreateVendorInput, UserUpdateVendorInput } from "@case-clinical/shared/util/sdk";
import { VendorBusinessProviderService } from "./business/vendor.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createVendor(input);
    }

    updateVendor(input: UserUpdateVendorInput, vendorId: string): Observable<Vendor> {
        return this.businessProvider.updateVendor(input, vendorId);
    }

    importVendors(vendors: UserUpdateVendorInput[]): Observable<boolean> {
        return this.businessProvider.importVendors(vendors);
    }
}

