
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationProcedureCode, UserCreatePriorAuthorizationProcedureCodeInput, UserUpdatePriorAuthorizationProcedureCodeInput, UpdateResult, CostCategory, Procedure, PriorAuthorizationRequest } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationProcedureCodeBusinessProviderService } from "./prior-authorization-procedure-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthorizationProcedureCode(filteredObj);
    }

    updatePriorAuthorizationProcedureCode(input: UserUpdatePriorAuthorizationProcedureCodeInput, priorAuthorizationProcedureCodeId: string): Observable<PriorAuthorizationProcedureCode> {
        return this.businessProvider.updatePriorAuthorizationProcedureCode(input, priorAuthorizationProcedureCodeId);
    }

    importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes: UserUpdatePriorAuthorizationProcedureCodeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes);
    }

    validatePriorAuthorizationProcedureCodeExcelData(excelData: any[], costCategories: CostCategory[], procedures: Procedure[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
      return this.businessProvider.validatePriorAuthorizationProcedureCodeExcelData(excelData, costCategories, procedures, priorAuthorizationRequests);
    }
}

