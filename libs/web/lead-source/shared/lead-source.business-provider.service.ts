
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { LeadSource, UserCreateLeadSourceInput, UserUpdateLeadSourceInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLeadSourceExcelDataAction } from './actions/validate-lead-source-excel-data.action'
import { CreateLeadSourceAction } from './actions/create-lead-source.action'
import { UpdateLeadSourcesAction, UpdateLeadSourceAction } from './actions/update-lead-sources.action'


@Injectable({providedIn: 'root'})
export class LeadSourceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LeadSourceBusinessProviderService', logger, serviceContext)
  }

  createLeadSource(input: UserCreateLeadSourceInput): Observable<LeadSource> {
    const action = new CreateLeadSourceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLeadSource(input: UserUpdateLeadSourceInput, leadSourceId: string): Observable<LeadSource> {
    const action = new UpdateLeadSourceAction(input, leadSourceId); 
    action.Do(this);
    return action.response;   
  }
  
  importLeadSources(leadSources: UserUpdateLeadSourceInput[]): Observable<UpdateResult> {
    const updateLeadSourcesAction = new UpdateLeadSourcesAction(leadSources);
    updateLeadSourcesAction.Do(this)
    return updateLeadSourcesAction.response;
  }

  validateLeadSourceExcelData(excelData: any[] ) {
    const validateLeadSourceExcelDataAction = new ValidateLeadSourceExcelDataAction(excelData );
    validateLeadSourceExcelDataAction.Do(this)
    return validateLeadSourceExcelDataAction.response;
  }
}

