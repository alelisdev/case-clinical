
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FacilityFeeSchedule, UserCreateFacilityFeeScheduleInput, UserUpdateFacilityFeeScheduleInput, UpdateResult, Organization, Specialty } from "@case-clinical/shared/util/sdk";
import { FacilityFeeScheduleBusinessProviderService } from "./facility-fee-schedule.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createFacilityFeeSchedule(filteredObj);
    }

    updateFacilityFeeSchedule(input: UserUpdateFacilityFeeScheduleInput, facilityFeeScheduleId: string): Observable<FacilityFeeSchedule> {
        return this.businessProvider.updateFacilityFeeSchedule(input, facilityFeeScheduleId);
    }

    importFacilityFeeSchedules(facilityFeeSchedules: UserUpdateFacilityFeeScheduleInput[]): Observable<UpdateResult> {
        return this.businessProvider.importFacilityFeeSchedules(facilityFeeSchedules);
    }

    validateFacilityFeeScheduleExcelData(excelData: any[], organizations: Organization[], specialties: Specialty[]) {
      return this.businessProvider.validateFacilityFeeScheduleExcelData(excelData, organizations, specialties);
    }
}

