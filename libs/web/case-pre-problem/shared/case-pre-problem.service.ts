
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreProblem, UserCreateCasePreProblemInput, UserUpdateCasePreProblemInput, UpdateResult, LegalCase } from "@case-clinical/shared/util/sdk";
import { CasePreProblemBusinessProviderService } from "./case-pre-problem.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CasePreProblemService extends ServiceBase {
 constructor(
  @Inject(CasePreProblemBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CasePreProblemBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CasePreProblemService", loggingService, serviceContext);
 }

    createCasePreProblem(input: UserCreateCasePreProblemInput): Observable<CasePreProblem> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCasePreProblem(filteredObj);
    }

    updateCasePreProblem(input: UserUpdateCasePreProblemInput, casePreProblemId: string): Observable<CasePreProblem> {
        return this.businessProvider.updateCasePreProblem(input, casePreProblemId);
    }

    importCasePreProblems(casePreProblems: UserUpdateCasePreProblemInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCasePreProblems(casePreProblems);
    }

    validateCasePreProblemExcelData(excelData: any[], legalCases: LegalCase[]) {
      return this.businessProvider.validateCasePreProblemExcelData(excelData, legalCases);
    }
}

