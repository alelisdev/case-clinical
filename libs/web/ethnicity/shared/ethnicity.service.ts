
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Ethnicity, UserCreateEthnicityInput, UserUpdateEthnicityInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { EthnicityBusinessProviderService } from "./ethnicity.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createEthnicity(filteredObj);
    }

    updateEthnicity(input: UserUpdateEthnicityInput, ethnicityId: string): Observable<Ethnicity> {
        return this.businessProvider.updateEthnicity(input, ethnicityId);
    }

    importEthnicities(ethnicities: UserUpdateEthnicityInput[]): Observable<UpdateResult> {
        return this.businessProvider.importEthnicities(ethnicities);
    }

    validateEthnicityExcelData(excelData: any[] ) {
      return this.businessProvider.validateEthnicityExcelData(excelData );
    }
}

