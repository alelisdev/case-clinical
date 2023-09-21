
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { FacilityFeeSchedule, UserCreateFacilityFeeScheduleInput, UserUpdateFacilityFeeScheduleInput, UpdateResult, Organization, Specialty } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateFacilityFeeScheduleExcelDataAction } from './actions/validate-facility-fee-schedule-excel-data.action'
import { CreateFacilityFeeScheduleAction } from './actions/create-facility-fee-schedule.action'
import { UpdateFacilityFeeSchedulesAction, UpdateFacilityFeeScheduleAction } from './actions/update-facility-fee-schedules.action'


@Injectable({providedIn: 'root'})
export class FacilityFeeScheduleBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FacilityFeeScheduleBusinessProviderService', logger, serviceContext)
  }

  createFacilityFeeSchedule(input: UserCreateFacilityFeeScheduleInput): Observable<FacilityFeeSchedule> {
    const action = new CreateFacilityFeeScheduleAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateFacilityFeeSchedule(input: UserUpdateFacilityFeeScheduleInput, facilityFeeScheduleId: string): Observable<FacilityFeeSchedule> {
    const action = new UpdateFacilityFeeScheduleAction(input, facilityFeeScheduleId); 
    action.Do(this);
    return action.response;   
  }
  
  importFacilityFeeSchedules(facilityFeeSchedules: UserUpdateFacilityFeeScheduleInput[]): Observable<UpdateResult> {
    const updateFacilityFeeSchedulesAction = new UpdateFacilityFeeSchedulesAction(facilityFeeSchedules);
    updateFacilityFeeSchedulesAction.Do(this)
    return updateFacilityFeeSchedulesAction.response;
  }

  validateFacilityFeeScheduleExcelData(excelData: any[], organizations: Organization[], specialties: Specialty[]) {
    const validateFacilityFeeScheduleExcelDataAction = new ValidateFacilityFeeScheduleExcelDataAction(excelData, organizations, specialties);
    validateFacilityFeeScheduleExcelDataAction.Do(this)
    return validateFacilityFeeScheduleExcelDataAction.response;
  }
}

