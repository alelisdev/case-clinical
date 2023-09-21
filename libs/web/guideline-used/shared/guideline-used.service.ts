
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { GuidelineUsed, UserCreateGuidelineUsedInput, UserUpdateGuidelineUsedInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { GuidelineUsedBusinessProviderService } from "./guideline-used.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class GuidelineUsedService extends ServiceBase {
 constructor(
  @Inject(GuidelineUsedBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: GuidelineUsedBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("GuidelineUsedService", loggingService, serviceContext);
 }

    createGuidelineUsed(input: UserCreateGuidelineUsedInput): Observable<GuidelineUsed> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createGuidelineUsed(filteredObj);
    }

    updateGuidelineUsed(input: UserUpdateGuidelineUsedInput, guidelineUsedId: string): Observable<GuidelineUsed> {
        return this.businessProvider.updateGuidelineUsed(input, guidelineUsedId);
    }

    importGuidelineUseds(guidelineUseds: UserUpdateGuidelineUsedInput[]): Observable<UpdateResult> {
        return this.businessProvider.importGuidelineUseds(guidelineUseds);
    }

    validateGuidelineUsedExcelData(excelData: any[] ) {
      return this.businessProvider.validateGuidelineUsedExcelData(excelData );
    }
}

