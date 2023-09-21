
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { FeeSchedule, UserCreateFeeScheduleInput, UserUpdateFeeScheduleInput, UpdateResult, Organization, Specialty } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateFeeScheduleExcelDataAction } from './actions/validate-fee-schedule-excel-data.action'
import { CreateFeeScheduleAction } from './actions/create-fee-schedule.action'
import { UpdateFeeSchedulesAction, UpdateFeeScheduleAction } from './actions/update-fee-schedules.action'


@Injectable({providedIn: 'root'})
export class FeeScheduleBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FeeScheduleBusinessProviderService', logger, serviceContext)
  }

  createFeeSchedule(input: UserCreateFeeScheduleInput): Observable<FeeSchedule> {
    const action = new CreateFeeScheduleAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateFeeSchedule(input: UserUpdateFeeScheduleInput, feeScheduleId: string): Observable<FeeSchedule> {
    const action = new UpdateFeeScheduleAction(input, feeScheduleId); 
    action.Do(this);
    return action.response;   
  }
  
  importFeeSchedules(feeSchedules: UserUpdateFeeScheduleInput[]): Observable<UpdateResult> {
    const updateFeeSchedulesAction = new UpdateFeeSchedulesAction(feeSchedules);
    updateFeeSchedulesAction.Do(this)
    return updateFeeSchedulesAction.response;
  }

  validateFeeScheduleExcelData(excelData: any[], organizations: Organization[], specialties: Specialty[]) {
    const validateFeeScheduleExcelDataAction = new ValidateFeeScheduleExcelDataAction(excelData, organizations, specialties);
    validateFeeScheduleExcelDataAction.Do(this)
    return validateFeeScheduleExcelDataAction.response;
  }
}

