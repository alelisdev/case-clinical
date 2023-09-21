
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Contract, UserCreateContractInput, UserUpdateContractInput, UpdateResult, Organization, Template, Vendor, ReconciliationPeriodType, CalculationBasisType, Process } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContractExcelDataAction } from './actions/validate-contract-excel-data.action'
import { CreateContractAction } from './actions/create-contract.action'
import { UpdateContractsAction, UpdateContractAction } from './actions/update-contracts.action'
import { CheckRequiredFieldsAction } from './actions/check-required-fields.action'


@Injectable({providedIn: 'root'})
export class ContractBusinessProviderService extends ServiceBase {
  constructor(
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

  importContracts(contracts: UserUpdateContractInput[]): Observable<UpdateResult> {
    const updateContractsAction = new UpdateContractsAction(contracts);
    updateContractsAction.Do(this)
    return updateContractsAction.response;
  }

  validateRequredFields(excelData: any) {
    const validateRequredFieldsAction = new CheckRequiredFieldsAction(excelData);
    validateRequredFieldsAction.Do(this);
    return validateRequredFieldsAction.response;
  }

  validateContractExcelData(excelData: any[], organizations: Organization[], billingOrganizations: Organization[], templates: Template[], vendors: Vendor[], reconciliationPeriodTypes: ReconciliationPeriodType[], calculationBasisTypes: CalculationBasisType[], processes: Process[]) {
    const validateContractExcelDataAction = new ValidateContractExcelDataAction(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes);
    validateContractExcelDataAction.Do(this)
    return validateContractExcelDataAction.response;
  }
}

