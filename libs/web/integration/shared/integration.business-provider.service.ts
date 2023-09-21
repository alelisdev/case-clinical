
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Integration, UserCreateIntegrationInput, UserUpdateIntegrationInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateIntegrationExcelDataAction } from './actions/validate-integration-excel-data.action'
import { CreateIntegrationAction } from './actions/create-integration.action'
import { UpdateIntegrationsAction, UpdateIntegrationAction } from './actions/update-integrations.action'


@Injectable({providedIn: 'root'})
export class IntegrationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.IntegrationBusinessProviderService', logger, serviceContext)
  }

  createIntegration(input: UserCreateIntegrationInput): Observable<Integration> {
    const action = new CreateIntegrationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateIntegration(input: UserUpdateIntegrationInput, integrationId: string): Observable<Integration> {
    const action = new UpdateIntegrationAction(input, integrationId); 
    action.Do(this);
    return action.response;   
  }
  
  importIntegrations(integrations: UserUpdateIntegrationInput[]): Observable<UpdateResult> {
    const updateIntegrationsAction = new UpdateIntegrationsAction(integrations);
    updateIntegrationsAction.Do(this)
    return updateIntegrationsAction.response;
  }

  validateIntegrationExcelData(excelData: any[] ) {
    const validateIntegrationExcelDataAction = new ValidateIntegrationExcelDataAction(excelData );
    validateIntegrationExcelDataAction.Do(this)
    return validateIntegrationExcelDataAction.response;
  }
}

