
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { VendorType, UserCreateVendorTypeInput, UserUpdateVendorTypeInput } from "@case-clinical/shared/util/sdk";
import { VendorTypeBusinessProviderService } from "./business/vendor-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createVendorType(input);
    }

    updateVendorType(input: UserUpdateVendorTypeInput, vendorTypeId: string): Observable<VendorType> {
        return this.businessProvider.updateVendorType(input, vendorTypeId);
    }

    importVendorTypes(vendorTypes: UserUpdateVendorTypeInput[]): Observable<boolean> {
        return this.businessProvider.importVendorTypes(vendorTypes);
    }
}

