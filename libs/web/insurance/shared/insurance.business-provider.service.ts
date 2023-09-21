
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Insurance, UserCreateInsuranceInput, UserUpdateInsuranceInput, UpdateResult, LegalCase, InsuranceType, InsuranceSector, Lead } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateInsuranceExcelDataAction } from './actions/validate-insurance-excel-data.action'
import { CreateInsuranceAction } from './actions/create-insurance.action'
import { UpdateInsurancesAction, UpdateInsuranceAction } from './actions/update-insurances.action'


@Injectable({providedIn: 'root'})
export class InsuranceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InsuranceBusinessProviderService', logger, serviceContext)
  }

  createInsurance(input: UserCreateInsuranceInput): Observable<Insurance> {
    const action = new CreateInsuranceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInsurance(input: UserUpdateInsuranceInput, insuranceId: string): Observable<Insurance> {
    const action = new UpdateInsuranceAction(input, insuranceId); 
    action.Do(this);
    return action.response;   
  }
  
  importInsurances(insurances: UserUpdateInsuranceInput[]): Observable<UpdateResult> {
    const updateInsurancesAction = new UpdateInsurancesAction(insurances);
    updateInsurancesAction.Do(this)
    return updateInsurancesAction.response;
  }

  validateInsuranceExcelData(excelData: any[], legalCases: LegalCase[], insuranceTypes: InsuranceType[], insuranceSectors: InsuranceSector[], leads: Lead[]) {
    const validateInsuranceExcelDataAction = new ValidateInsuranceExcelDataAction(excelData, legalCases, insuranceTypes, insuranceSectors, leads);
    validateInsuranceExcelDataAction.Do(this)
    return validateInsuranceExcelDataAction.response;
  }
}

