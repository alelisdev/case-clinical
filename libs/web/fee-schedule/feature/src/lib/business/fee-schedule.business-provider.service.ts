
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateFeeScheduleAction} from './actions/create-fee-schedule.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {FeeSchedule, UserCreateFeeScheduleInput, UserUpdateFeeScheduleInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateFeeSchedulesAction, UpdateFeeScheduleAction } from './actions/update-fee-schedules.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class FeeScheduleBusinessProviderService extends ServiceBase {constructor(
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
  
  importFeeSchedules(feeSchedules: UserUpdateFeeScheduleInput[]): Observable<boolean> {
    const updateFeeSchedulesAction = new UpdateFeeSchedulesAction(feeSchedules);
    updateFeeSchedulesAction.Do(this)
    return updateFeeSchedulesAction.response;
  }
}

