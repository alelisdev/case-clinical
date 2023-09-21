
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateClaimProcedureAction} from './actions/create-claim-procedure.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ClaimProcedure, UserCreateClaimProcedureInput, UserUpdateClaimProcedureInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateClaimProceduresAction, UpdateClaimProcedureAction } from './actions/update-claim-procedures.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ClaimProcedureBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClaimProcedureBusinessProviderService', logger, serviceContext)
  }

  createClaimProcedure(input: UserCreateClaimProcedureInput): Observable<ClaimProcedure> {
    const action = new CreateClaimProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClaimProcedure(input: UserUpdateClaimProcedureInput, claimProcedureId: string): Observable<ClaimProcedure> {
    const action = new UpdateClaimProcedureAction(input, claimProcedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importClaimProcedures(claimProcedures: UserUpdateClaimProcedureInput[]): Observable<boolean> {
    const updateClaimProceduresAction = new UpdateClaimProceduresAction(claimProcedures);
    updateClaimProceduresAction.Do(this)
    return updateClaimProceduresAction.response;
  }
}

