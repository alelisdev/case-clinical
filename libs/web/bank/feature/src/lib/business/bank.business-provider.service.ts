
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateBankAction} from './actions/create-bank.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Bank, UserCreateBankInput, UserUpdateBankInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateBanksAction, UpdateBankAction } from './actions/update-banks.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class BankBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.BankBusinessProviderService', logger, serviceContext)
  }

  createBank(input: UserCreateBankInput): Observable<Bank> {
    const action = new CreateBankAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateBank(input: UserUpdateBankInput, bankId: string): Observable<Bank> {
    const action = new UpdateBankAction(input, bankId); 
    action.Do(this);
    return action.response;   
  }
  
  importBanks(banks: UserUpdateBankInput[]): Observable<boolean> {
    const updateBanksAction = new UpdateBanksAction(banks);
    updateBanksAction.Do(this)
    return updateBanksAction.response;
  }
}

