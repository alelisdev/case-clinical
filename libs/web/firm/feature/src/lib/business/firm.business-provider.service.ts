import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateFirmAction} from './actions/create-firm.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Firm, UpdateResult, UserCreateFirmInput, UserUpdateFirmInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateFirmsAction, UpdateFirmAction } from './actions/update-firms.action'
import {WebCoreDataAccessService, } from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class FirmBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FirmBusinessProviderService', logger, serviceContext)
  }

  createFirm(input: UserCreateFirmInput): Observable<Firm> {
    const action = new CreateFirmAction(input);
    action.Do(this);
    return action.response;
  }

  updateFirm(input: UserUpdateFirmInput, firmId: string): Observable<Firm> {
    const action = new UpdateFirmAction(input, firmId);
    action.Do(this);
    return action.response;
  }

  importFirms(firms: UserUpdateFirmInput[]): Observable<UpdateResult> {
    const updateFirmsAction = new UpdateFirmsAction(firms);
    updateFirmsAction.Do(this)
    return updateFirmsAction.response;
  }
}

