
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClinicalProviderService, UserCreateClinicalProviderServiceInput, UserUpdateClinicalProviderServiceInput, UpdateResult, Service, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClinicalProviderServiceExcelDataAction } from './actions/validate-clinical-provider-service-excel-data.action'
import { CreateClinicalProviderServiceAction } from './actions/create-clinical-provider-service.action'
import { UpdateClinicalProviderServicesAction, UpdateClinicalProviderServiceAction } from './actions/update-clinical-provider-services.action'


@Injectable({providedIn: 'root'})
export class ClinicalProviderServiceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClinicalProviderServiceBusinessProviderService', logger, serviceContext)
  }

  createClinicalProviderService(input: UserCreateClinicalProviderServiceInput): Observable<ClinicalProviderService> {
    const action = new CreateClinicalProviderServiceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClinicalProviderService(input: UserUpdateClinicalProviderServiceInput, clinicalProviderServiceId: string): Observable<ClinicalProviderService> {
    const action = new UpdateClinicalProviderServiceAction(input, clinicalProviderServiceId); 
    action.Do(this);
    return action.response;   
  }
  
  importClinicalProviderServices(clinicalProviderServices: UserUpdateClinicalProviderServiceInput[]): Observable<UpdateResult> {
    const updateClinicalProviderServicesAction = new UpdateClinicalProviderServicesAction(clinicalProviderServices);
    updateClinicalProviderServicesAction.Do(this)
    return updateClinicalProviderServicesAction.response;
  }

  validateClinicalProviderServiceExcelData(excelData: any[], services: Service[], clinicalProviders: ClinicalProvider[]) {
    const validateClinicalProviderServiceExcelDataAction = new ValidateClinicalProviderServiceExcelDataAction(excelData, services, clinicalProviders);
    validateClinicalProviderServiceExcelDataAction.Do(this)
    return validateClinicalProviderServiceExcelDataAction.response;
  }
}

