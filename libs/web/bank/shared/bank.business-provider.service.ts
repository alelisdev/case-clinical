
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Bank, UserCreateBankInput, UserUpdateBankInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateBankExcelDataAction } from './actions/validate-bank-excel-data.action'
import { CreateBankAction } from './actions/create-bank.action'
import { UpdateBanksAction, UpdateBankAction } from './actions/update-banks.action'


@Injectable({providedIn: 'root'})
export class BankBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importBanks(banks: UserUpdateBankInput[]): Observable<UpdateResult> {
    const updateBanksAction = new UpdateBanksAction(banks);
    updateBanksAction.Do(this)
    return updateBanksAction.response;
  }

  validateBankExcelData(excelData: any[] ) {
    const validateBankExcelDataAction = new ValidateBankExcelDataAction(excelData );
    validateBankExcelDataAction.Do(this)
    return validateBankExcelDataAction.response;
  }
}

