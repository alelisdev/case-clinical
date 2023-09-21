
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreAccident, UserCreateCasePreAccidentInput, UserUpdateCasePreAccidentInput } from "@case-clinical/shared/util/sdk";
import { CasePreAccidentBusinessProviderService } from "./business/case-pre-accident.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CasePreAccidentService extends ServiceBase {
 constructor(
  @Inject(CasePreAccidentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CasePreAccidentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CasePreAccidentService", loggingService, serviceContext);
 }

    createCasePreAccident(input: UserCreateCasePreAccidentInput): Observable<CasePreAccident> {
        return this.businessProvider.createCasePreAccident(input);
    }

    updateCasePreAccident(input: UserUpdateCasePreAccidentInput, casePreAccidentId: string): Observable<CasePreAccident> {
        return this.businessProvider.updateCasePreAccident(input, casePreAccidentId);
    }

    importCasePreAccidents(casePreAccidents: UserUpdateCasePreAccidentInput[]): Observable<boolean> {
        return this.businessProvider.importCasePreAccidents(casePreAccidents);
    }
}

