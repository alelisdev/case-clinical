
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationRequest, UserCreatePriorAuthorizationRequestInput, UserUpdatePriorAuthorizationRequestInput, UpdateResult, ProcedureSite, SurgicalPosition, ClinicalProvider, Document, VisitKind, GuidelineUsed, AuthorizationKind, AuthorizationStatus, Patient, CaseProcedure } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationRequestBusinessProviderService } from "./prior-authorization-request.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PriorAuthorizationRequestService extends ServiceBase {
 constructor(
  @Inject(PriorAuthorizationRequestBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthorizationRequestBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthorizationRequestService", loggingService, serviceContext);
 }

    createPriorAuthorizationRequest(input: UserCreatePriorAuthorizationRequestInput): Observable<PriorAuthorizationRequest> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthorizationRequest(filteredObj);
    }

    updatePriorAuthorizationRequest(input: UserUpdatePriorAuthorizationRequestInput, priorAuthorizationRequestId: string): Observable<PriorAuthorizationRequest> {
        return this.businessProvider.updatePriorAuthorizationRequest(input, priorAuthorizationRequestId);
    }

    importPriorAuthorizationRequests(priorAuthorizationRequests: UserUpdatePriorAuthorizationRequestInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthorizationRequests(priorAuthorizationRequests);
    }

    validatePriorAuthorizationRequestExcelData(excelData: any[], procedureSites: ProcedureSite[], surgicalPositions: SurgicalPosition[], treatingProviders: ClinicalProvider[], referredTos: ClinicalProvider[], prescriptions: Document[], visitKinds: VisitKind[], guidelineUseds: GuidelineUsed[], authorizationKinds: AuthorizationKind[], authorizationStatuses: AuthorizationStatus[],  patients: Patient[], caseProcedures: CaseProcedure[]) {
      return this.businessProvider.validatePriorAuthorizationRequestExcelData(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, patients, caseProcedures);
    }
}

