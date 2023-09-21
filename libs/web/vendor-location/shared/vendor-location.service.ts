
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { VendorLocation, UserCreateVendorLocationInput, UserUpdateVendorLocationInput, UpdateResult, Location, Vendor } from "@case-clinical/shared/util/sdk";
import { VendorLocationBusinessProviderService } from "./vendor-location.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class VendorLocationService extends ServiceBase {
 constructor(
  @Inject(VendorLocationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: VendorLocationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("VendorLocationService", loggingService, serviceContext);
 }

    createVendorLocation(input: UserCreateVendorLocationInput): Observable<VendorLocation> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createVendorLocation(filteredObj);
    }

    updateVendorLocation(input: UserUpdateVendorLocationInput, vendorLocationId: string): Observable<VendorLocation> {
        return this.businessProvider.updateVendorLocation(input, vendorLocationId);
    }

    importVendorLocations(vendorLocations: UserUpdateVendorLocationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importVendorLocations(vendorLocations);
    }

    validateVendorLocationExcelData(excelData: any[], locations: Location[], vendors: Vendor[]) {
      return this.businessProvider.validateVendorLocationExcelData(excelData, locations, vendors);
    }
}

