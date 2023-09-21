
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContractTermAction} from './actions/create-contract-term.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContractTerm, UserCreateContractTermInput, UserUpdateContractTermInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContractTermsAction, UpdateContractTermAction } from './actions/update-contract-terms.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContractTermBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContractTermBusinessProviderService', logger, serviceContext)
  }

  createContractTerm(input: UserCreateContractTermInput): Observable<ContractTerm> {
    const action = new CreateContractTermAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContractTerm(input: UserUpdateContractTermInput, contractTermId: string): Observable<ContractTerm> {
    const action = new UpdateContractTermAction(input, contractTermId); 
    action.Do(this);
    return action.response;   
  }
  
  importContractTerms(contractTerms: UserUpdateContractTermInput[]): Observable<boolean> {
    const updateContractTermsAction = new UpdateContractTermsAction(contractTerms);
    updateContractTermsAction.Do(this)
    return updateContractTermsAction.response;
  }
}

