
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { DiagnosisCode, UserCreateDiagnosisCodeInput, UserUpdateDiagnosisCodeInput } from "@case-clinical/shared/util/sdk";
import { DiagnosisCodeBusinessProviderService } from "./business/diagnosis-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class DiagnosisCodeService extends ServiceBase {
 constructor(
  @Inject(DiagnosisCodeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: DiagnosisCodeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("DiagnosisCodeService", loggingService, serviceContext);
 }

    createDiagnosisCode(input: UserCreateDiagnosisCodeInput): Observable<DiagnosisCode> {
        return this.businessProvider.createDiagnosisCode(input);
    }

    updateDiagnosisCode(input: UserUpdateDiagnosisCodeInput, diagnosisCodeId: string): Observable<DiagnosisCode> {
        return this.businessProvider.updateDiagnosisCode(input, diagnosisCodeId);
    }

    importDiagnosisCodes(diagnosisCodes: UserUpdateDiagnosisCodeInput[]): Observable<boolean> {
        return this.businessProvider.importDiagnosisCodes(diagnosisCodes);
    }
}

