
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PlaceOfService, UserCreatePlaceOfServiceInput, UserUpdatePlaceOfServiceInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PlaceOfServiceBusinessProviderService } from "./place-of-service.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PlaceOfServiceService extends ServiceBase {
 constructor(
  @Inject(PlaceOfServiceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PlaceOfServiceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PlaceOfServiceService", loggingService, serviceContext);
 }

    createPlaceOfService(input: UserCreatePlaceOfServiceInput): Observable<PlaceOfService> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPlaceOfService(filteredObj);
    }

    updatePlaceOfService(input: UserUpdatePlaceOfServiceInput, placeOfServiceId: string): Observable<PlaceOfService> {
        return this.businessProvider.updatePlaceOfService(input, placeOfServiceId);
    }

    importPlaceOfServices(placeOfServices: UserUpdatePlaceOfServiceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPlaceOfServices(placeOfServices);
    }

    validatePlaceOfServiceExcelData(excelData: any[] ) {
      return this.businessProvider.validatePlaceOfServiceExcelData(excelData );
    }
}

