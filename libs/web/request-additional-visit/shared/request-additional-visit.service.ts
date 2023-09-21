
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RequestAdditionalVisit, UserCreateRequestAdditionalVisitInput, UserUpdateRequestAdditionalVisitInput, UpdateResult, Patient, LegalCase } from "@case-clinical/shared/util/sdk";
import { RequestAdditionalVisitBusinessProviderService } from "./request-additional-visit.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class RequestAdditionalVisitService extends ServiceBase {
 constructor(
  @Inject(RequestAdditionalVisitBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RequestAdditionalVisitBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RequestAdditionalVisitService", loggingService, serviceContext);
 }

    createRequestAdditionalVisit(input: UserCreateRequestAdditionalVisitInput): Observable<RequestAdditionalVisit> {
        return this.businessProvider.createRequestAdditionalVisit(input);
    }

    updateRequestAdditionalVisit(input: UserUpdateRequestAdditionalVisitInput, requestAdditionalVisitId: string): Observable<RequestAdditionalVisit> {
        return this.businessProvider.updateRequestAdditionalVisit(input, requestAdditionalVisitId);
    }

    importRequestAdditionalVisits(requestAdditionalVisits: UserUpdateRequestAdditionalVisitInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRequestAdditionalVisits(requestAdditionalVisits);
    }

    validateRequestAdditionalVisitExcelData(excelData: any[], patients: Patient[], legalCases: LegalCase[]) {
      return this.businessProvider.validateRequestAdditionalVisitExcelData(excelData, patients, legalCases);
    }
}

