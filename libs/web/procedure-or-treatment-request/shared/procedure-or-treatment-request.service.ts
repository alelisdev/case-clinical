
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureOrTreatmentRequest, UserCreateProcedureOrTreatmentRequestInput, UserUpdateProcedureOrTreatmentRequestInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ProcedureOrTreatmentRequestBusinessProviderService } from "./procedure-or-treatment-request.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureOrTreatmentRequestService extends ServiceBase {
 constructor(
  @Inject(ProcedureOrTreatmentRequestBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureOrTreatmentRequestBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureOrTreatmentRequestService", loggingService, serviceContext);
 }

    createProcedureOrTreatmentRequest(input: UserCreateProcedureOrTreatmentRequestInput): Observable<ProcedureOrTreatmentRequest> {
        return this.businessProvider.createProcedureOrTreatmentRequest(input);
    }

    updateProcedureOrTreatmentRequest(input: UserUpdateProcedureOrTreatmentRequestInput, procedureOrTreatmentRequestId: string): Observable<ProcedureOrTreatmentRequest> {
        return this.businessProvider.updateProcedureOrTreatmentRequest(input, procedureOrTreatmentRequestId);
    }

    importProcedureOrTreatmentRequests(procedureOrTreatmentRequests: UserUpdateProcedureOrTreatmentRequestInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureOrTreatmentRequests(procedureOrTreatmentRequests);
    }

    validateProcedureOrTreatmentRequestExcelData(excelData: any[] ) {
      return this.businessProvider.validateProcedureOrTreatmentRequestExcelData(excelData );
    }
}

