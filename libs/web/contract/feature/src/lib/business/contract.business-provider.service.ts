
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContractAction} from './actions/create-contract.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Contract, UserCreateContractInput, UserUpdateContractInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContractsAction, UpdateContractAction } from './actions/update-contracts.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContractBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContractBusinessProviderService', logger, serviceContext)
  }

  createContract(input: UserCreateContractInput): Observable<Contract> {
    const action = new CreateContractAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContract(input: UserUpdateContractInput, contractId: string): Observable<Contract> {
    const action = new UpdateContractAction(input, contractId); 
    action.Do(this);
    return action.response;   
  }
  
  importContracts(contracts: UserUpdateContractInput[]): Observable<boolean> {
    const updateContractsAction = new UpdateContractsAction(contracts);
    updateContractsAction.Do(this)
    return updateContractsAction.response;
  }
}

