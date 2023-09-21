
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Treatment, UserCreateTreatmentInput, UserUpdateTreatmentInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { TreatmentBusinessProviderService } from "./treatment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class TreatmentService extends ServiceBase {
 constructor(
  @Inject(TreatmentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TreatmentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TreatmentService", loggingService, serviceContext);
 }

    createTreatment(input: UserCreateTreatmentInput): Observable<Treatment> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createTreatment(filteredObj);
    }

    updateTreatment(input: UserUpdateTreatmentInput, treatmentId: string): Observable<Treatment> {
        return this.businessProvider.updateTreatment(input, treatmentId);
    }

    importTreatments(treatments: UserUpdateTreatmentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTreatments(treatments);
    }

    validateTreatmentExcelData(excelData: any[] ) {
      return this.businessProvider.validateTreatmentExcelData(excelData );
    }
}

