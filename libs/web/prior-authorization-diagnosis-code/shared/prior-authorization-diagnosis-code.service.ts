
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationDiagnosisCode, UserCreatePriorAuthorizationDiagnosisCodeInput, UserUpdatePriorAuthorizationDiagnosisCodeInput, UpdateResult, DiagnosisCode, PriorAuthorizationRequest } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationDiagnosisCodeBusinessProviderService } from "./prior-authorization-diagnosis-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthorizationDiagnosisCode(filteredObj);
    }

    updatePriorAuthorizationDiagnosisCode(input: UserUpdatePriorAuthorizationDiagnosisCodeInput, priorAuthorizationDiagnosisCodeId: string): Observable<PriorAuthorizationDiagnosisCode> {
        return this.businessProvider.updatePriorAuthorizationDiagnosisCode(input, priorAuthorizationDiagnosisCodeId);
    }

    importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes: UserUpdatePriorAuthorizationDiagnosisCodeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes);
    }

    validatePriorAuthorizationDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
      return this.businessProvider.validatePriorAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, priorAuthorizationRequests);
    }
}

