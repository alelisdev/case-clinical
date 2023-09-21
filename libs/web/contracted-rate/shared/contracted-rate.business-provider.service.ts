
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContractedRate, UserCreateContractedRateInput, UserUpdateContractedRateInput, UpdateResult, Contract, ContractedRateKind, ContractKind, VisitKind, ClinicalProvider, Specialty } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContractedRateExcelDataAction } from './actions/validate-contracted-rate-excel-data.action'
import { CreateContractedRateAction } from './actions/create-contracted-rate.action'
import { UpdateContractedRatesAction, UpdateContractedRateAction } from './actions/update-contracted-rates.action'


@Injectable({providedIn: 'root'})
export class ContractedRateBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContractedRates(contractedRates: UserUpdateContractedRateInput[]): Observable<UpdateResult> {
    const updateContractedRatesAction = new UpdateContractedRatesAction(contractedRates);
    updateContractedRatesAction.Do(this)
    return updateContractedRatesAction.response;
  }

  validateContractedRateExcelData(excelData: any[], contracts: Contract[], contractedRateKinds: ContractedRateKind[], contractKinds: ContractKind[], visitKinds: VisitKind[], clinicalProviders: ClinicalProvider[], specialties: Specialty[]) {
    const validateContractedRateExcelDataAction = new ValidateContractedRateExcelDataAction(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties);
    validateContractedRateExcelDataAction.Do(this)
    return validateContractedRateExcelDataAction.response;
  }
}

