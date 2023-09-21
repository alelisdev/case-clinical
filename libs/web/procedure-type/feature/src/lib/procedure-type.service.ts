
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureType, UserCreateProcedureTypeInput, UserUpdateProcedureTypeInput } from "@case-clinical/shared/util/sdk";
import { ProcedureTypeBusinessProviderService } from "./business/procedure-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ProcedureTypeService extends ServiceBase {
 constructor(
  @Inject(ProcedureTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureTypeService", loggingService, serviceContext);
 }

    createProcedureType(input: UserCreateProcedureTypeInput): Observable<ProcedureType> {
        return this.businessProvider.createProcedureType(input);
    }

    updateProcedureType(input: UserUpdateProcedureTypeInput, procedureTypeId: string): Observable<ProcedureType> {
        return this.businessProvider.updateProcedureType(input, procedureTypeId);
    }

    importProcedureTypes(procedureTypes: UserUpdateProcedureTypeInput[]): Observable<boolean> {
        return this.businessProvider.importProcedureTypes(procedureTypes);
    }
}

