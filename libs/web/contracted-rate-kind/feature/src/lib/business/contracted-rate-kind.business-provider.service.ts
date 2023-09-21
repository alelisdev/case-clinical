
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContractedRateKindAction} from './actions/create-contracted-rate-kind.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContractedRateKind, UserCreateContractedRateKindInput, UserUpdateContractedRateKindInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContractedRateKindsAction, UpdateContractedRateKindAction } from './actions/update-contracted-rate-kinds.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContractedRateKindBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContractedRateKindBusinessProviderService', logger, serviceContext)
  }

  createContractedRateKind(input: UserCreateContractedRateKindInput): Observable<ContractedRateKind> {
    const action = new CreateContractedRateKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContractedRateKind(input: UserUpdateContractedRateKindInput, contractedRateKindId: string): Observable<ContractedRateKind> {
    const action = new UpdateContractedRateKindAction(input, contractedRateKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importContractedRateKinds(contractedRateKinds: UserUpdateContractedRateKindInput[]): Observable<boolean> {
    const updateContractedRateKindsAction = new UpdateContractedRateKindsAction(contractedRateKinds);
    updateContractedRateKindsAction.Do(this)
    return updateContractedRateKindsAction.response;
  }
}

