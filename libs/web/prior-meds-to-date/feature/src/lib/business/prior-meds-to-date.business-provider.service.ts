
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorMedsToDateAction} from './actions/create-prior-meds-to-date.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorMedsToDate, UserCreatePriorMedsToDateInput, UserUpdatePriorMedsToDateInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorMedsToDatesAction, UpdatePriorMedsToDateAction } from './actions/update-prior-meds-to-dates.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorMedsToDateBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorMedsToDateBusinessProviderService', logger, serviceContext)
  }

  createPriorMedsToDate(input: UserCreatePriorMedsToDateInput): Observable<PriorMedsToDate> {
    const action = new CreatePriorMedsToDateAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorMedsToDate(input: UserUpdatePriorMedsToDateInput, priorMedsToDateId: string): Observable<PriorMedsToDate> {
    const action = new UpdatePriorMedsToDateAction(input, priorMedsToDateId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorMedsToDates(priorMedsToDates: UserUpdatePriorMedsToDateInput[]): Observable<boolean> {
    const updatePriorMedsToDatesAction = new UpdatePriorMedsToDatesAction(priorMedsToDates);
    updatePriorMedsToDatesAction.Do(this)
    return updatePriorMedsToDatesAction.response;
  }
}

