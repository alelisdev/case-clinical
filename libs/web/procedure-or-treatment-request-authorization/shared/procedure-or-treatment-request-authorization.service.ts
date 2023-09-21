
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureOrTreatmentRequestAuthorization, UserCreateProcedureOrTreatmentRequestAuthorizationInput, UserUpdateProcedureOrTreatmentRequestAuthorizationInput, UpdateResult, Authorization, ProcedureOrTreatmentRequest } from "@case-clinical/shared/util/sdk";
import { ProcedureOrTreatmentRequestAuthorizationBusinessProviderService } from "./procedure-or-treatment-request-authorization.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureOrTreatmentRequestAuthorizationService extends ServiceBase {
 constructor(
  @Inject(ProcedureOrTreatmentRequestAuthorizationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureOrTreatmentRequestAuthorizationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureOrTreatmentRequestAuthorizationService", loggingService, serviceContext);
 }

    createProcedureOrTreatmentRequestAuthorization(input: UserCreateProcedureOrTreatmentRequestAuthorizationInput): Observable<ProcedureOrTreatmentRequestAuthorization> {
        return this.businessProvider.createProcedureOrTreatmentRequestAuthorization(input);
    }

    updateProcedureOrTreatmentRequestAuthorization(input: UserUpdateProcedureOrTreatmentRequestAuthorizationInput, procedureOrTreatmentRequestAuthorizationId: string): Observable<ProcedureOrTreatmentRequestAuthorization> {
        return this.businessProvider.updateProcedureOrTreatmentRequestAuthorization(input, procedureOrTreatmentRequestAuthorizationId);
    }

    importProcedureOrTreatmentRequestAuthorizations(procedureOrTreatmentRequestAuthorizations: UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureOrTreatmentRequestAuthorizations(procedureOrTreatmentRequestAuthorizations);
    }

    validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData: any[], authorizations: Authorization[], procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[]) {
      return this.businessProvider.validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData, authorizations, procedureOrTreatmentRequests);
    }
}

