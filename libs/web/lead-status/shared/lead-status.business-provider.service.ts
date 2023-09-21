
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { LeadStatus, UserCreateLeadStatusInput, UserUpdateLeadStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLeadStatusExcelDataAction } from './actions/validate-lead-status-excel-data.action'
import { CreateLeadStatusAction } from './actions/create-lead-status.action'
import { UpdateLeadStatusesAction, UpdateLeadStatusAction } from './actions/update-lead-statuses.action'


@Injectable({providedIn: 'root'})
export class LeadStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LeadStatusBusinessProviderService', logger, serviceContext)
  }

  createLeadStatus(input: UserCreateLeadStatusInput): Observable<LeadStatus> {
    const action = new CreateLeadStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLeadStatus(input: UserUpdateLeadStatusInput, leadStatusId: string): Observable<LeadStatus> {
    const action = new UpdateLeadStatusAction(input, leadStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importLeadStatuses(leadStatuses: UserUpdateLeadStatusInput[]): Observable<UpdateResult> {
    const updateLeadStatusesAction = new UpdateLeadStatusesAction(leadStatuses);
    updateLeadStatusesAction.Do(this)
    return updateLeadStatusesAction.response;
  }

  validateLeadStatusExcelData(excelData: any[] ) {
    const validateLeadStatusExcelDataAction = new ValidateLeadStatusExcelDataAction(excelData );
    validateLeadStatusExcelDataAction.Do(this)
    return validateLeadStatusExcelDataAction.response;
  }
}

