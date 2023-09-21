
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureOrTreatmentRequestDiagnosisCode, UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput, UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, UpdateResult, DiagnosisCode, ProcedureOrTreatmentRequest } from "@case-clinical/shared/util/sdk";
import { ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService } from "./procedure-or-treatment-request-diagnosis-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureOrTreatmentRequestDiagnosisCodeService extends ServiceBase {
 constructor(
  @Inject(ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureOrTreatmentRequestDiagnosisCodeService", loggingService, serviceContext);
 }

    createProcedureOrTreatmentRequestDiagnosisCode(input: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput): Observable<ProcedureOrTreatmentRequestDiagnosisCode> {
        return this.businessProvider.createProcedureOrTreatmentRequestDiagnosisCode(input);
    }

    updateProcedureOrTreatmentRequestDiagnosisCode(input: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, procedureOrTreatmentRequestDiagnosisCodeId: string): Observable<ProcedureOrTreatmentRequestDiagnosisCode> {
        return this.businessProvider.updateProcedureOrTreatmentRequestDiagnosisCode(input, procedureOrTreatmentRequestDiagnosisCodeId);
    }

    importProcedureOrTreatmentRequestDiagnosisCodes(procedureOrTreatmentRequestDiagnosisCodes: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureOrTreatmentRequestDiagnosisCodes(procedureOrTreatmentRequestDiagnosisCodes);
    }

    validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[]) {
      return this.businessProvider.validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData, diagnoses, procedureOrTreatmentRequests);
    }
}

