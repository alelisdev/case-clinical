
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PchProvider, UserCreatePchProviderInput, UserUpdatePchProviderInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePchProviderExcelDataAction } from './actions/validate-pch-provider-excel-data.action'
import { CreatePchProviderAction } from './actions/create-pch-provider.action'
import { UpdatePchProvidersAction, UpdatePchProviderAction } from './actions/update-pch-providers.action'


@Injectable({providedIn: 'root'})
export class PchProviderBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PchProviderBusinessProviderService', logger, serviceContext)
  }

  createPchProvider(input: UserCreatePchProviderInput): Observable<PchProvider> {
    const action = new CreatePchProviderAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePchProvider(input: UserUpdatePchProviderInput, pchProviderId: string): Observable<PchProvider> {
    const action = new UpdatePchProviderAction(input, pchProviderId); 
    action.Do(this);
    return action.response;   
  }
  
  importPchProviders(pchProviders: UserUpdatePchProviderInput[]): Observable<UpdateResult> {
    const updatePchProvidersAction = new UpdatePchProvidersAction(pchProviders);
    updatePchProvidersAction.Do(this)
    return updatePchProvidersAction.response;
  }

  validatePchProviderExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validatePchProviderExcelDataAction = new ValidatePchProviderExcelDataAction(excelData, clinicalProviders);
    validatePchProviderExcelDataAction.Do(this)
    return validatePchProviderExcelDataAction.response;
  }
}

