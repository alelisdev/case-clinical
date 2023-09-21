
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationProcedureCode, UserCreatePriorAuthorizationProcedureCodeInput, UserUpdatePriorAuthorizationProcedureCodeInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationProcedureCodeBusinessProviderService } from "./business/prior-authorization-procedure-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PriorAuthorizationProcedureCodeService extends ServiceBase {
 constructor(
  @Inject(PriorAuthorizationProcedureCodeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthorizationProcedureCodeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthorizationProcedureCodeService", loggingService, serviceContext);
 }

    createPriorAuthorizationProcedureCode(input: UserCreatePriorAuthorizationProcedureCodeInput): Observable<PriorAuthorizationProcedureCode> {
        return this.businessProvider.createPriorAuthorizationProcedureCode(input);
    }

    updatePriorAuthorizationProcedureCode(input: UserUpdatePriorAuthorizationProcedureCodeInput, priorAuthorizationProcedureCodeId: string): Observable<PriorAuthorizationProcedureCode> {
        return this.businessProvider.updatePriorAuthorizationProcedureCode(input, priorAuthorizationProcedureCodeId);
    }

    importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes: UserUpdatePriorAuthorizationProcedureCodeInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes);
    }
}

