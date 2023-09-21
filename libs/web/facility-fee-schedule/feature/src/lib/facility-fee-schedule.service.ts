
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FacilityFeeSchedule, UserCreateFacilityFeeScheduleInput, UserUpdateFacilityFeeScheduleInput } from "@case-clinical/shared/util/sdk";
import { FacilityFeeScheduleBusinessProviderService } from "./business/facility-fee-schedule.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class FacilityFeeScheduleService extends ServiceBase {
 constructor(
  @Inject(FacilityFeeScheduleBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FacilityFeeScheduleBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FacilityFeeScheduleService", loggingService, serviceContext);
 }

    createFacilityFeeSchedule(input: UserCreateFacilityFeeScheduleInput): Observable<FacilityFeeSchedule> {
        return this.businessProvider.createFacilityFeeSchedule(input);
    }

    updateFacilityFeeSchedule(input: UserUpdateFacilityFeeScheduleInput, facilityFeeScheduleId: string): Observable<FacilityFeeSchedule> {
        return this.businessProvider.updateFacilityFeeSchedule(input, facilityFeeScheduleId);
    }

    importFacilityFeeSchedules(facilityFeeSchedules: UserUpdateFacilityFeeScheduleInput[]): Observable<boolean> {
        return this.businessProvider.importFacilityFeeSchedules(facilityFeeSchedules);
    }
}

