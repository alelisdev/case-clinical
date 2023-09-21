
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Guideline, UserCreateGuidelineInput, UserUpdateGuidelineInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { GuidelineBusinessProviderService } from "./guideline.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createGuideline(filteredObj);
    }

    updateGuideline(input: UserUpdateGuidelineInput, guidelineId: string): Observable<Guideline> {
        return this.businessProvider.updateGuideline(input, guidelineId);
    }

    importGuidelines(guidelines: UserUpdateGuidelineInput[]): Observable<UpdateResult> {
        return this.businessProvider.importGuidelines(guidelines);
    }

    validateGuidelineExcelData(excelData: any[] ) {
      return this.businessProvider.validateGuidelineExcelData(excelData );
    }
}

