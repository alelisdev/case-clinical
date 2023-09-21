
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Ethnicity, UserCreateEthnicityInput, UserUpdateEthnicityInput } from "@case-clinical/shared/util/sdk";
import { EthnicityBusinessProviderService } from "./business/ethnicity.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class EthnicityService extends ServiceBase {
 constructor(
  @Inject(EthnicityBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: EthnicityBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("EthnicityService", loggingService, serviceContext);
 }

    createEthnicity(input: UserCreateEthnicityInput): Observable<Ethnicity> {
        return this.businessProvider.createEthnicity(input);
    }

    updateEthnicity(input: UserUpdateEthnicityInput, ethnicityId: string): Observable<Ethnicity> {
        return this.businessProvider.updateEthnicity(input, ethnicityId);
    }

    importEthnicities(ethnicities: UserUpdateEthnicityInput[]): Observable<boolean> {
        return this.businessProvider.importEthnicities(ethnicities);
    }
}

