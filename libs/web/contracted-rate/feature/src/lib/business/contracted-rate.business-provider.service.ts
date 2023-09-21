
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContractedRateAction} from './actions/create-contracted-rate.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContractedRate, UserCreateContractedRateInput, UserUpdateContractedRateInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContractedRatesAction, UpdateContractedRateAction } from './actions/update-contracted-rates.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContractedRateBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContractedRateBusinessProviderService', logger, serviceContext)
  }

  createContractedRate(input: UserCreateContractedRateInput): Observable<ContractedRate> {
    const action = new CreateContractedRateAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContractedRate(input: UserUpdateContractedRateInput, contractedRateId: string): Observable<ContractedRate> {
    const action = new UpdateContractedRateAction(input, contractedRateId); 
    action.Do(this);
    return action.response;   
  }
  
  importContractedRates(contractedRates: UserUpdateContractedRateInput[]): Observable<boolean> {
    const updateContractedRatesAction = new UpdateContractedRatesAction(contractedRates);
    updateContractedRatesAction.Do(this)
    return updateContractedRatesAction.response;
  }
}

