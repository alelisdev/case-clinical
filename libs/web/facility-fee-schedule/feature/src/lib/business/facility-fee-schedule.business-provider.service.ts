
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateFacilityFeeScheduleAction} from './actions/create-facility-fee-schedule.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {FacilityFeeSchedule, UserCreateFacilityFeeScheduleInput, UserUpdateFacilityFeeScheduleInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateFacilityFeeSchedulesAction, UpdateFacilityFeeScheduleAction } from './actions/update-facility-fee-schedules.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class FacilityFeeScheduleBusinessProviderService extends ServiceBase {constructor(
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
  
  importFacilityFeeSchedules(facilityFeeSchedules: UserUpdateFacilityFeeScheduleInput[]): Observable<boolean> {
    const updateFacilityFeeSchedulesAction = new UpdateFacilityFeeSchedulesAction(facilityFeeSchedules);
    updateFacilityFeeSchedulesAction.Do(this)
    return updateFacilityFeeSchedulesAction.response;
  }
}

