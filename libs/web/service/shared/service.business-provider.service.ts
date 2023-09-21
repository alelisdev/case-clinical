
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Service, UserCreateServiceInput, UserUpdateServiceInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateServiceExcelDataAction } from './actions/validate-service-excel-data.action'
import { CreateServiceAction } from './actions/create-service.action'
import { UpdateServicesAction, UpdateServiceAction } from './actions/update-services.action'


@Injectable({providedIn: 'root'})
export class ServiceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ServiceBusinessProviderService', logger, serviceContext)
  }

  createService(input: UserCreateServiceInput): Observable<Service> {
    const action = new CreateServiceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateService(input: UserUpdateServiceInput, serviceId: string): Observable<Service> {
    const action = new UpdateServiceAction(input, serviceId); 
    action.Do(this);
    return action.response;   
  }
  
  importServices(services: UserUpdateServiceInput[]): Observable<UpdateResult> {
    const updateServicesAction = new UpdateServicesAction(services);
    updateServicesAction.Do(this)
    return updateServicesAction.response;
  }

  validateServiceExcelData(excelData: any[] ) {
    const validateServiceExcelDataAction = new ValidateServiceExcelDataAction(excelData );
    validateServiceExcelDataAction.Do(this)
    return validateServiceExcelDataAction.response;
  }
}

