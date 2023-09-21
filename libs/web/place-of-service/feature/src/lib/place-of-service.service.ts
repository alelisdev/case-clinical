
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PlaceOfService, UserCreatePlaceOfServiceInput, UserUpdatePlaceOfServiceInput } from "@case-clinical/shared/util/sdk";
import { PlaceOfServiceBusinessProviderService } from "./business/place-of-service.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPlaceOfService(input);
    }

    updatePlaceOfService(input: UserUpdatePlaceOfServiceInput, placeOfServiceId: string): Observable<PlaceOfService> {
        return this.businessProvider.updatePlaceOfService(input, placeOfServiceId);
    }

    importPlaceOfServices(placeOfServices: UserUpdatePlaceOfServiceInput[]): Observable<boolean> {
        return this.businessProvider.importPlaceOfServices(placeOfServices);
    }
}

