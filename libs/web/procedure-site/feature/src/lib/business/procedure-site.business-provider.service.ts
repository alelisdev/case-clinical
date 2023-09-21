
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateProcedureSiteAction} from './actions/create-procedure-site.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ProcedureSite, UserCreateProcedureSiteInput, UserUpdateProcedureSiteInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateProcedureSitesAction, UpdateProcedureSiteAction } from './actions/update-procedure-sites.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ProcedureSiteBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureSiteBusinessProviderService', logger, serviceContext)
  }

  createProcedureSite(input: UserCreateProcedureSiteInput): Observable<ProcedureSite> {
    const action = new CreateProcedureSiteAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureSite(input: UserUpdateProcedureSiteInput, procedureSiteId: string): Observable<ProcedureSite> {
    const action = new UpdateProcedureSiteAction(input, procedureSiteId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureSites(procedureSites: UserUpdateProcedureSiteInput[]): Observable<boolean> {
    const updateProcedureSitesAction = new UpdateProcedureSitesAction(procedureSites);
    updateProcedureSitesAction.Do(this)
    return updateProcedureSitesAction.response;
  }
}

