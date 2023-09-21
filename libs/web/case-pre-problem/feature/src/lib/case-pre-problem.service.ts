
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreProblem, UserCreateCasePreProblemInput, UserUpdateCasePreProblemInput } from "@case-clinical/shared/util/sdk";
import { CasePreProblemBusinessProviderService } from "./business/case-pre-problem.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createCasePreProblem(input);
    }

    updateCasePreProblem(input: UserUpdateCasePreProblemInput, casePreProblemId: string): Observable<CasePreProblem> {
        return this.businessProvider.updateCasePreProblem(input, casePreProblemId);
    }

    importCasePreProblems(casePreProblems: UserUpdateCasePreProblemInput[]): Observable<boolean> {
        return this.businessProvider.importCasePreProblems(casePreProblems);
    }
}

