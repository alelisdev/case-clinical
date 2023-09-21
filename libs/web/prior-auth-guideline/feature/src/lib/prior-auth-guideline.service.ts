
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthGuideline, UserCreatePriorAuthGuidelineInput, UserUpdatePriorAuthGuidelineInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthGuidelineBusinessProviderService } from "./business/prior-auth-guideline.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PriorAuthGuidelineService extends ServiceBase {
 constructor(
  @Inject(PriorAuthGuidelineBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthGuidelineBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthGuidelineService", loggingService, serviceContext);
 }

    createPriorAuthGuideline(input: UserCreatePriorAuthGuidelineInput): Observable<PriorAuthGuideline> {
        return this.businessProvider.createPriorAuthGuideline(input);
    }

    updatePriorAuthGuideline(input: UserUpdatePriorAuthGuidelineInput, priorAuthGuidelineId: string): Observable<PriorAuthGuideline> {
        return this.businessProvider.updatePriorAuthGuideline(input, priorAuthGuidelineId);
    }

    importPriorAuthGuidelines(priorAuthGuidelines: UserUpdatePriorAuthGuidelineInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthGuidelines(priorAuthGuidelines);
    }
}

