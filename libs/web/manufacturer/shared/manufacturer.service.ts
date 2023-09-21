
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Manufacturer, UserCreateManufacturerInput, UserUpdateManufacturerInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ManufacturerBusinessProviderService } from "./manufacturer.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createManufacturer(filteredObj);
    }

    updateManufacturer(input: UserUpdateManufacturerInput, manufacturerId: string): Observable<Manufacturer> {
        return this.businessProvider.updateManufacturer(input, manufacturerId);
    }

    importManufacturers(manufacturers: UserUpdateManufacturerInput[]): Observable<UpdateResult> {
        return this.businessProvider.importManufacturers(manufacturers);
    }

    validateManufacturerExcelData(excelData: any[] ) {
      return this.businessProvider.validateManufacturerExcelData(excelData );
    }
}

