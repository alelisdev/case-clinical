
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClinicalProviderTag, UserCreateClinicalProviderTagInput, UserUpdateClinicalProviderTagInput, UpdateResult, ClinicalProvider, Tag } from "@case-clinical/shared/util/sdk";
import { ClinicalProviderTagBusinessProviderService } from "./clinical-provider-tag.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClinicalProviderTagService extends ServiceBase {
 constructor(
  @Inject(ClinicalProviderTagBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClinicalProviderTagBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClinicalProviderTagService", loggingService, serviceContext);
 }

    createClinicalProviderTag(input: UserCreateClinicalProviderTagInput): Observable<ClinicalProviderTag> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClinicalProviderTag(filteredObj);
    }

    updateClinicalProviderTag(input: UserUpdateClinicalProviderTagInput, clinicalProviderTagId: string): Observable<ClinicalProviderTag> {
        return this.businessProvider.updateClinicalProviderTag(input, clinicalProviderTagId);
    }

    importClinicalProviderTags(clinicalProviderTags: UserUpdateClinicalProviderTagInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClinicalProviderTags(clinicalProviderTags);
    }

    validateClinicalProviderTagExcelData(excelData: any[], clinicalProviders: ClinicalProvider[], tags: Tag[]) {
      return this.businessProvider.validateClinicalProviderTagExcelData(excelData, clinicalProviders, tags);
    }
}

