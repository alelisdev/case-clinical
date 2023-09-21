
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Experience, UserCreateExperienceInput, UserUpdateExperienceInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { ExperienceBusinessProviderService } from "./experience.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ExperienceService extends ServiceBase {
 constructor(
  @Inject(ExperienceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ExperienceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ExperienceService", loggingService, serviceContext);
 }

    createExperience(input: UserCreateExperienceInput): Observable<Experience> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createExperience(filteredObj);
    }

    updateExperience(input: UserUpdateExperienceInput, experienceId: string): Observable<Experience> {
        return this.businessProvider.updateExperience(input, experienceId);
    }

    importExperiences(experiences: UserUpdateExperienceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importExperiences(experiences);
    }

    validateExperienceExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateExperienceExcelData(excelData, clinicalProviders);
    }
}

