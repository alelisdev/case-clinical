
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseType, UserCreateCaseTypeInput, UserUpdateCaseTypeInput } from "@case-clinical/shared/util/sdk";
import { CaseTypeBusinessProviderService } from "./business/case-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CaseTypeService extends ServiceBase {
 constructor(
  @Inject(CaseTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseTypeService", loggingService, serviceContext);
 }

    createCaseType(input: UserCreateCaseTypeInput): Observable<CaseType> {
        return this.businessProvider.createCaseType(input);
    }

    updateCaseType(input: UserUpdateCaseTypeInput, caseTypeId: string): Observable<CaseType> {
        return this.businessProvider.updateCaseType(input, caseTypeId);
    }

    importCaseTypes(caseTypes: UserUpdateCaseTypeInput[]): Observable<boolean> {
        return this.businessProvider.importCaseTypes(caseTypes);
    }
}

