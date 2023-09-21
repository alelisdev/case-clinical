
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FeeSchedule, UserCreateFeeScheduleInput, UserUpdateFeeScheduleInput } from "@case-clinical/shared/util/sdk";
import { FeeScheduleBusinessProviderService } from "./business/fee-schedule.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createFeeSchedule(input);
    }

    updateFeeSchedule(input: UserUpdateFeeScheduleInput, feeScheduleId: string): Observable<FeeSchedule> {
        return this.businessProvider.updateFeeSchedule(input, feeScheduleId);
    }

    importFeeSchedules(feeSchedules: UserUpdateFeeScheduleInput[]): Observable<boolean> {
        return this.businessProvider.importFeeSchedules(feeSchedules);
    }
}

