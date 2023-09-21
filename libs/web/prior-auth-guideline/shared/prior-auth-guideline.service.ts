
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthGuideline, UserCreatePriorAuthGuidelineInput, UserUpdatePriorAuthGuidelineInput, UpdateResult, Guideline, PriorAuthorizationRequest } from "@case-clinical/shared/util/sdk";
import { PriorAuthGuidelineBusinessProviderService } from "./prior-auth-guideline.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthGuideline(filteredObj);
    }

    updatePriorAuthGuideline(input: UserUpdatePriorAuthGuidelineInput, priorAuthGuidelineId: string): Observable<PriorAuthGuideline> {
        return this.businessProvider.updatePriorAuthGuideline(input, priorAuthGuidelineId);
    }

    importPriorAuthGuidelines(priorAuthGuidelines: UserUpdatePriorAuthGuidelineInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthGuidelines(priorAuthGuidelines);
    }

    validatePriorAuthGuidelineExcelData(excelData: any[], guidelines: Guideline[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
      return this.businessProvider.validatePriorAuthGuidelineExcelData(excelData, guidelines, priorAuthorizationRequests);
    }
}

