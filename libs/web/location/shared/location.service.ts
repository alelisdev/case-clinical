
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Location, UserCreateLocationInput, UserUpdateLocationInput, UpdateResult, PlaceOfService } from "@case-clinical/shared/util/sdk";
import { LocationBusinessProviderService } from "./location.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LocationService extends ServiceBase {
 constructor(
  @Inject(LocationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LocationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LocationService", loggingService, serviceContext);
 }

    createLocation(input: UserCreateLocationInput): Observable<Location> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLocation(filteredObj);
    }

    updateLocation(input: UserUpdateLocationInput, locationId: string): Observable<Location> {
        return this.businessProvider.updateLocation(input, locationId);
    }

    importLocations(locations: UserUpdateLocationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLocations(locations);
    }

    validateLocationExcelData(excelData: any[], placeOfServices: PlaceOfService[]) {
      return this.businessProvider.validateLocationExcelData(excelData, placeOfServices);
    }
}

