
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Guideline, UserCreateGuidelineInput, UserUpdateGuidelineInput } from "@case-clinical/shared/util/sdk";
import { GuidelineBusinessProviderService } from "./business/guideline.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class GuidelineService extends ServiceBase {
 constructor(
  @Inject(GuidelineBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: GuidelineBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("GuidelineService", loggingService, serviceContext);
 }

    createGuideline(input: UserCreateGuidelineInput): Observable<Guideline> {
        return this.businessProvider.createGuideline(input);
    }

    updateGuideline(input: UserUpdateGuidelineInput, guidelineId: string): Observable<Guideline> {
        return this.businessProvider.updateGuideline(input, guidelineId);
    }

    importGuidelines(guidelines: UserUpdateGuidelineInput[]): Observable<boolean> {
        return this.businessProvider.importGuidelines(guidelines);
    }
}

