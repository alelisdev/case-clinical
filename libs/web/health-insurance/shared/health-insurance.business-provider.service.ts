
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { HealthInsurance, UserCreateHealthInsuranceInput, UserUpdateHealthInsuranceInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateHealthInsuranceExcelDataAction } from './actions/validate-health-insurance-excel-data.action'
import { CreateHealthInsuranceAction } from './actions/create-health-insurance.action'
import { UpdateHealthInsurancesAction, UpdateHealthInsuranceAction } from './actions/update-health-insurances.action'


@Injectable({providedIn: 'root'})
export class HealthInsuranceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.HealthInsuranceBusinessProviderService', logger, serviceContext)
  }

  createHealthInsurance(input: UserCreateHealthInsuranceInput): Observable<HealthInsurance> {
    const action = new CreateHealthInsuranceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateHealthInsurance(input: UserUpdateHealthInsuranceInput, healthInsuranceId: string): Observable<HealthInsurance> {
    const action = new UpdateHealthInsuranceAction(input, healthInsuranceId); 
    action.Do(this);
    return action.response;   
  }
  
  importHealthInsurances(healthInsurances: UserUpdateHealthInsuranceInput[]): Observable<UpdateResult> {
    const updateHealthInsurancesAction = new UpdateHealthInsurancesAction(healthInsurances);
    updateHealthInsurancesAction.Do(this)
    return updateHealthInsurancesAction.response;
  }

  validateHealthInsuranceExcelData(excelData: any[] ) {
    const validateHealthInsuranceExcelDataAction = new ValidateHealthInsuranceExcelDataAction(excelData );
    validateHealthInsuranceExcelDataAction.Do(this)
    return validateHealthInsuranceExcelDataAction.response;
  }
}

