
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Education, UserCreateEducationInput, UserUpdateEducationInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { EducationBusinessProviderService } from "./education.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class EducationService extends ServiceBase {
 constructor(
  @Inject(EducationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: EducationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("EducationService", loggingService, serviceContext);
 }

    createEducation(input: UserCreateEducationInput): Observable<Education> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createEducation(filteredObj);
    }

    updateEducation(input: UserUpdateEducationInput, educationId: string): Observable<Education> {
        return this.businessProvider.updateEducation(input, educationId);
    }

    importEducations(educations: UserUpdateEducationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importEducations(educations);
    }

    validateEducationExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateEducationExcelData(excelData, clinicalProviders);
    }
}

