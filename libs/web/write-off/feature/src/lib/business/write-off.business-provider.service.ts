
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateWriteOffAction} from './actions/create-write-off.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {WriteOff, UserCreateWriteOffInput, UserUpdateWriteOffInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateWriteOffsAction, UpdateWriteOffAction } from './actions/update-write-offs.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class WriteOffBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.WriteOffBusinessProviderService', logger, serviceContext)
  }

  createWriteOff(input: UserCreateWriteOffInput): Observable<WriteOff> {
    const action = new CreateWriteOffAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateWriteOff(input: UserUpdateWriteOffInput, writeOffId: string): Observable<WriteOff> {
    const action = new UpdateWriteOffAction(input, writeOffId); 
    action.Do(this);
    return action.response;   
  }
  
  importWriteOffs(writeOffs: UserUpdateWriteOffInput[]): Observable<boolean> {
    const updateWriteOffsAction = new UpdateWriteOffsAction(writeOffs);
    updateWriteOffsAction.Do(this)
    return updateWriteOffsAction.response;
  }
}

