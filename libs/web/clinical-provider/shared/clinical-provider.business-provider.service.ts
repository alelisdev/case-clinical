
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClinicalProvider, UserCreateClinicalProviderInput, UserUpdateClinicalProviderInput, UpdateResult, Vendor } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClinicalProviderExcelDataAction } from './actions/validate-clinical-provider-excel-data.action'
import { CreateClinicalProviderAction } from './actions/create-clinical-provider.action'
import { UpdateClinicalProvidersAction, UpdateClinicalProviderAction } from './actions/update-clinical-providers.action'


@Injectable({providedIn: 'root'})
export class ClinicalProviderBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClinicalProviderBusinessProviderService', logger, serviceContext)
  }

  createClinicalProvider(input: UserCreateClinicalProviderInput): Observable<ClinicalProvider> {
    const action = new CreateClinicalProviderAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClinicalProvider(input: UserUpdateClinicalProviderInput, clinicalProviderId: string): Observable<ClinicalProvider> {
    const action = new UpdateClinicalProviderAction(input, clinicalProviderId); 
    action.Do(this);
    return action.response;   
  }
  
  importClinicalProviders(clinicalProviders: UserUpdateClinicalProviderInput[]): Observable<UpdateResult> {
    const updateClinicalProvidersAction = new UpdateClinicalProvidersAction(clinicalProviders);
    updateClinicalProvidersAction.Do(this)
    return updateClinicalProvidersAction.response;
  }

  validateClinicalProviderExcelData(excelData: any[], vendors: Vendor[]) {
    const validateClinicalProviderExcelDataAction = new ValidateClinicalProviderExcelDataAction(excelData, vendors);
    validateClinicalProviderExcelDataAction.Do(this)
    return validateClinicalProviderExcelDataAction.response;
  }
}

