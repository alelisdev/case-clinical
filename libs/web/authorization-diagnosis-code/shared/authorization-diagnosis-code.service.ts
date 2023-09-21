
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationDiagnosisCode, UserCreateAuthorizationDiagnosisCodeInput, UserUpdateAuthorizationDiagnosisCodeInput, UpdateResult, DiagnosisCode, Authorization } from "@case-clinical/shared/util/sdk";
import { AuthorizationDiagnosisCodeBusinessProviderService } from "./authorization-diagnosis-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AuthorizationDiagnosisCodeService extends ServiceBase {
 constructor(
  @Inject(AuthorizationDiagnosisCodeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AuthorizationDiagnosisCodeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AuthorizationDiagnosisCodeService", loggingService, serviceContext);
 }

    createAuthorizationDiagnosisCode(input: UserCreateAuthorizationDiagnosisCodeInput): Observable<AuthorizationDiagnosisCode> {
        return this.businessProvider.createAuthorizationDiagnosisCode(input);
    }

    updateAuthorizationDiagnosisCode(input: UserUpdateAuthorizationDiagnosisCodeInput, authorizationDiagnosisCodeId: string): Observable<AuthorizationDiagnosisCode> {
        return this.businessProvider.updateAuthorizationDiagnosisCode(input, authorizationDiagnosisCodeId);
    }

    importAuthorizationDiagnosisCodes(authorizationDiagnosisCodes: UserUpdateAuthorizationDiagnosisCodeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAuthorizationDiagnosisCodes(authorizationDiagnosisCodes);
    }

    validateAuthorizationDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], authorizations: Authorization[]) {
      return this.businessProvider.validateAuthorizationDiagnosisCodeExcelData(excelData, diagnoses, authorizations);
    }
}

