
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContractTerm, UserCreateContractTermInput, UserUpdateContractTermInput, UpdateResult, Contract } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContractTermExcelDataAction } from './actions/validate-contract-term-excel-data.action'
import { CreateContractTermAction } from './actions/create-contract-term.action'
import { UpdateContractTermsAction, UpdateContractTermAction } from './actions/update-contract-terms.action'


@Injectable({providedIn: 'root'})
export class ContractTermBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContractTerms(contractTerms: UserUpdateContractTermInput[]): Observable<UpdateResult> {
    const updateContractTermsAction = new UpdateContractTermsAction(contractTerms);
    updateContractTermsAction.Do(this)
    return updateContractTermsAction.response;
  }

  validateContractTermExcelData(excelData: any[], contracts: Contract[]) {
    const validateContractTermExcelDataAction = new ValidateContractTermExcelDataAction(excelData, contracts);
    validateContractTermExcelDataAction.Do(this)
    return validateContractTermExcelDataAction.response;
  }
}

