
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationDiagnosisCode, UserCreatePriorAuthorizationDiagnosisCodeInput, UserUpdatePriorAuthorizationDiagnosisCodeInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationDiagnosisCodeBusinessProviderService } from "./business/prior-authorization-diagnosis-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PriorAuthorizationDiagnosisCodeService extends ServiceBase {
 constructor(
  @Inject(PriorAuthorizationDiagnosisCodeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthorizationDiagnosisCodeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthorizationDiagnosisCodeService", loggingService, serviceContext);
 }

    createPriorAuthorizationDiagnosisCode(input: UserCreatePriorAuthorizationDiagnosisCodeInput): Observable<PriorAuthorizationDiagnosisCode> {
        return this.businessProvider.createPriorAuthorizationDiagnosisCode(input);
    }

    updatePriorAuthorizationDiagnosisCode(input: UserUpdatePriorAuthorizationDiagnosisCodeInput, priorAuthorizationDiagnosisCodeId: string): Observable<PriorAuthorizationDiagnosisCode> {
        return this.businessProvider.updatePriorAuthorizationDiagnosisCode(input, priorAuthorizationDiagnosisCodeId);
    }

    importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes: UserUpdatePriorAuthorizationDiagnosisCodeInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes);
    }
}

