
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LegalCase, UserCreateLegalCaseInput,UpdateResult, UserUpdateLegalCaseInput } from "@case-clinical/shared/util/sdk";
import { LegalCaseBusinessProviderService } from "./business/legal-case.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class LegalCaseService extends ServiceBase {
 constructor(
  @Inject(LegalCaseBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LegalCaseBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LegalCaseService", loggingService, serviceContext);
 }

    createLegalCase(input: UserCreateLegalCaseInput): Observable<LegalCase> {
        return this.businessProvider.createLegalCase(input);
    }

    updateLegalCase(input: UserUpdateLegalCaseInput, legalCaseId: string): Observable<LegalCase> {
        return this.businessProvider.updateLegalCase(input, legalCaseId);
    }

    importLegalCases(legalCases: UserUpdateLegalCaseInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLegalCases(legalCases);
    }
}

