
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateIntegrationAction} from './actions/create-integration.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Integration, UserCreateIntegrationInput, UserUpdateIntegrationInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateIntegrationsAction, UpdateIntegrationAction } from './actions/update-integrations.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class IntegrationBusinessProviderService extends ServiceBase {constructor(
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
  
  importIntegrations(integrations: UserUpdateIntegrationInput[]): Observable<boolean> {
    const updateIntegrationsAction = new UpdateIntegrationsAction(integrations);
    updateIntegrationsAction.Do(this)
    return updateIntegrationsAction.response;
  }
}

