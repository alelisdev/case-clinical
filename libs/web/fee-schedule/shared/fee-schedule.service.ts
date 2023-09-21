
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FeeSchedule, UserCreateFeeScheduleInput, UserUpdateFeeScheduleInput, UpdateResult, Organization, Specialty } from "@case-clinical/shared/util/sdk";
import { FeeScheduleBusinessProviderService } from "./fee-schedule.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class FeeScheduleService extends ServiceBase {
 constructor(
  @Inject(FeeScheduleBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FeeScheduleBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FeeScheduleService", loggingService, serviceContext);
 }

    createFeeSchedule(input: UserCreateFeeScheduleInput): Observable<FeeSchedule> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createFeeSchedule(filteredObj);
    }

    updateFeeSchedule(input: UserUpdateFeeScheduleInput, feeScheduleId: string): Observable<FeeSchedule> {
        return this.businessProvider.updateFeeSchedule(input, feeScheduleId);
    }

    importFeeSchedules(feeSchedules: UserUpdateFeeScheduleInput[]): Observable<UpdateResult> {
        return this.businessProvider.importFeeSchedules(feeSchedules);
    }

    validateFeeScheduleExcelData(excelData: any[], organizations: Organization[], specialties: Specialty[]) {
      return this.businessProvider.validateFeeScheduleExcelData(excelData, organizations, specialties);
    }
}

