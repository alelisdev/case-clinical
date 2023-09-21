
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContractKind, UserCreateContractKindInput, UserUpdateContractKindInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContractKindExcelDataAction } from './actions/validate-contract-kind-excel-data.action'
import { CreateContractKindAction } from './actions/create-contract-kind.action'
import { UpdateContractKindsAction, UpdateContractKindAction } from './actions/update-contract-kinds.action'


@Injectable({providedIn: 'root'})
export class ContractKindBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContractKinds(contractKinds: UserUpdateContractKindInput[]): Observable<UpdateResult> {
    const updateContractKindsAction = new UpdateContractKindsAction(contractKinds);
    updateContractKindsAction.Do(this)
    return updateContractKindsAction.response;
  }

  validateContractKindExcelData(excelData: any[] ) {
    const validateContractKindExcelDataAction = new ValidateContractKindExcelDataAction(excelData );
    validateContractKindExcelDataAction.Do(this)
    return validateContractKindExcelDataAction.response;
  }
}

