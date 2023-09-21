
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContractKindAction} from './actions/create-contract-kind.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContractKind, UserCreateContractKindInput, UserUpdateContractKindInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContractKindsAction, UpdateContractKindAction } from './actions/update-contract-kinds.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContractKindBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContractKindBusinessProviderService', logger, serviceContext)
  }

  createContractKind(input: UserCreateContractKindInput): Observable<ContractKind> {
    const action = new CreateContractKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContractKind(input: UserUpdateContractKindInput, contractKindId: string): Observable<ContractKind> {
    const action = new UpdateContractKindAction(input, contractKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importContractKinds(contractKinds: UserUpdateContractKindInput[]): Observable<boolean> {
    const updateContractKindsAction = new UpdateContractKindsAction(contractKinds);
    updateContractKindsAction.Do(this)
    return updateContractKindsAction.response;
  }
}

