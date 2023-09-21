
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Manufacturer, UserCreateManufacturerInput, UserUpdateManufacturerInput } from "@case-clinical/shared/util/sdk";
import { ManufacturerBusinessProviderService } from "./business/manufacturer.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService extends ServiceBase {
 constructor(
  @Inject(ManufacturerBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ManufacturerBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ManufacturerService", loggingService, serviceContext);
 }

    createManufacturer(input: UserCreateManufacturerInput): Observable<Manufacturer> {
        return this.businessProvider.createManufacturer(input);
    }

    updateManufacturer(input: UserUpdateManufacturerInput, manufacturerId: string): Observable<Manufacturer> {
        return this.businessProvider.updateManufacturer(input, manufacturerId);
    }

    importManufacturers(manufacturers: UserUpdateManufacturerInput[]): Observable<boolean> {
        return this.businessProvider.importManufacturers(manufacturers);
    }
}

