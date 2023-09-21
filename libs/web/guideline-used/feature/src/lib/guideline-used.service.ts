
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { GuidelineUsed, UserCreateGuidelineUsedInput, UserUpdateGuidelineUsedInput } from "@case-clinical/shared/util/sdk";
import { GuidelineUsedBusinessProviderService } from "./business/guideline-used.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createGuidelineUsed(input);
    }

    updateGuidelineUsed(input: UserUpdateGuidelineUsedInput, guidelineUsedId: string): Observable<GuidelineUsed> {
        return this.businessProvider.updateGuidelineUsed(input, guidelineUsedId);
    }

    importGuidelineUseds(guidelineUseds: UserUpdateGuidelineUsedInput[]): Observable<boolean> {
        return this.businessProvider.importGuidelineUseds(guidelineUseds);
    }
}

