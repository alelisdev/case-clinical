
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateOrganizationAction} from './actions/create-organization.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Organization, UserCreateOrganizationInput, UserUpdateOrganizationInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateOrganizationsAction, UpdateOrganizationAction } from './actions/update-organizations.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class OrganizationBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.OrganizationBusinessProviderService', logger, serviceContext)
  }

  createOrganization(input: UserCreateOrganizationInput): Observable<Organization> {
    const action = new CreateOrganizationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateOrganization(input: UserUpdateOrganizationInput, organizationId: string): Observable<Organization> {
    const action = new UpdateOrganizationAction(input, organizationId); 
    action.Do(this);
    return action.response;   
  }
  
  importOrganizations(organizations: UserUpdateOrganizationInput[]): Observable<boolean> {
    const updateOrganizationsAction = new UpdateOrganizationsAction(organizations);
    updateOrganizationsAction.Do(this)
    return updateOrganizationsAction.response;
  }
}

