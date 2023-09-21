
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreInjury, UserCreateCasePreInjuryInput, UserUpdateCasePreInjuryInput } from "@case-clinical/shared/util/sdk";
import { CasePreInjuryBusinessProviderService } from "./business/case-pre-injury.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CasePreInjuryService extends ServiceBase {
 constructor(
  @Inject(CasePreInjuryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CasePreInjuryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CasePreInjuryService", loggingService, serviceContext);
 }

    createCasePreInjury(input: UserCreateCasePreInjuryInput): Observable<CasePreInjury> {
        return this.businessProvider.createCasePreInjury(input);
    }

    updateCasePreInjury(input: UserUpdateCasePreInjuryInput, casePreInjuryId: string): Observable<CasePreInjury> {
        return this.businessProvider.updateCasePreInjury(input, casePreInjuryId);
    }

    importCasePreInjuries(casePreInjuries: UserUpdateCasePreInjuryInput[]): Observable<boolean> {
        return this.businessProvider.importCasePreInjuries(casePreInjuries);
    }
}

