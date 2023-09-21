
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Award, UserCreateAwardInput, UserUpdateAwardInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { AwardBusinessProviderService } from "./award.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AwardService extends ServiceBase {
 constructor(
  @Inject(AwardBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AwardBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AwardService", loggingService, serviceContext);
 }

    createAward(input: UserCreateAwardInput): Observable<Award> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAward(filteredObj);
    }

    updateAward(input: UserUpdateAwardInput, awardId: string): Observable<Award> {
        return this.businessProvider.updateAward(input, awardId);
    }

    importAwards(awards: UserUpdateAwardInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAwards(awards);
    }

    validateAwardExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateAwardExcelData(excelData, clinicalProviders);
    }
}

