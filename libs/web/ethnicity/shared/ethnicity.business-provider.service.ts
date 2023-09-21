
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Ethnicity, UserCreateEthnicityInput, UserUpdateEthnicityInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateEthnicityExcelDataAction } from './actions/validate-ethnicity-excel-data.action'
import { CreateEthnicityAction } from './actions/create-ethnicity.action'
import { UpdateEthnicitiesAction, UpdateEthnicityAction } from './actions/update-ethnicities.action'


@Injectable({providedIn: 'root'})
export class EthnicityBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.EthnicityBusinessProviderService', logger, serviceContext)
  }

  createEthnicity(input: UserCreateEthnicityInput): Observable<Ethnicity> {
    const action = new CreateEthnicityAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateEthnicity(input: UserUpdateEthnicityInput, ethnicityId: string): Observable<Ethnicity> {
    const action = new UpdateEthnicityAction(input, ethnicityId); 
    action.Do(this);
    return action.response;   
  }
  
  importEthnicities(ethnicities: UserUpdateEthnicityInput[]): Observable<UpdateResult> {
    const updateEthnicitiesAction = new UpdateEthnicitiesAction(ethnicities);
    updateEthnicitiesAction.Do(this)
    return updateEthnicitiesAction.response;
  }

  validateEthnicityExcelData(excelData: any[] ) {
    const validateEthnicityExcelDataAction = new ValidateEthnicityExcelDataAction(excelData );
    validateEthnicityExcelDataAction.Do(this)
    return validateEthnicityExcelDataAction.response;
  }
}

