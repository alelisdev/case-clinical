
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContractedRateKind, UserCreateContractedRateKindInput, UserUpdateContractedRateKindInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContractedRateKindExcelDataAction } from './actions/validate-contracted-rate-kind-excel-data.action'
import { CreateContractedRateKindAction } from './actions/create-contracted-rate-kind.action'
import { UpdateContractedRateKindsAction, UpdateContractedRateKindAction } from './actions/update-contracted-rate-kinds.action'


@Injectable({providedIn: 'root'})
export class ContractedRateKindBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContractedRateKinds(contractedRateKinds: UserUpdateContractedRateKindInput[]): Observable<UpdateResult> {
    const updateContractedRateKindsAction = new UpdateContractedRateKindsAction(contractedRateKinds);
    updateContractedRateKindsAction.Do(this)
    return updateContractedRateKindsAction.response;
  }

  validateContractedRateKindExcelData(excelData: any[] ) {
    const validateContractedRateKindExcelDataAction = new ValidateContractedRateKindExcelDataAction(excelData );
    validateContractedRateKindExcelDataAction.Do(this)
    return validateContractedRateKindExcelDataAction.response;
  }
}

