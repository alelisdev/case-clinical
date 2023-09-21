
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Organization, UserCreateOrganizationInput, UserUpdateOrganizationInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateOrganizationExcelDataAction } from './actions/validate-organization-excel-data.action'
import { CreateOrganizationAction } from './actions/create-organization.action'
import { UpdateOrganizationsAction, UpdateOrganizationAction } from './actions/update-organizations.action'


@Injectable({providedIn: 'root'})
export class OrganizationBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importOrganizations(organizations: UserUpdateOrganizationInput[]): Observable<UpdateResult> {
    const updateOrganizationsAction = new UpdateOrganizationsAction(organizations);
    updateOrganizationsAction.Do(this)
    return updateOrganizationsAction.response;
  }

  validateOrganizationExcelData(excelData: any[] ) {
    const validateOrganizationExcelDataAction = new ValidateOrganizationExcelDataAction(excelData );
    validateOrganizationExcelDataAction.Do(this)
    return validateOrganizationExcelDataAction.response;
  }
}

