
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { LeadAction, UserCreateLeadActionInput, UserUpdateLeadActionInput, UpdateResult, Lead } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLeadActionExcelDataAction } from './actions/validate-lead-action-excel-data.action'
import { CreateLeadActionAction } from './actions/create-lead-action.action'
import { UpdateLeadActionsAction, UpdateLeadActionAction } from './actions/update-lead-actions.action'


@Injectable({providedIn: 'root'})
export class LeadActionBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LeadActionBusinessProviderService', logger, serviceContext)
  }

  createLeadAction(input: UserCreateLeadActionInput): Observable<LeadAction> {
    const action = new CreateLeadActionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLeadAction(input: UserUpdateLeadActionInput, leadActionId: string): Observable<LeadAction> {
    const action = new UpdateLeadActionAction(input, leadActionId); 
    action.Do(this);
    return action.response;   
  }
  
  importLeadActions(leadActions: UserUpdateLeadActionInput[]): Observable<UpdateResult> {
    const updateLeadActionsAction = new UpdateLeadActionsAction(leadActions);
    updateLeadActionsAction.Do(this)
    return updateLeadActionsAction.response;
  }

  validateLeadActionExcelData(excelData: any[], leads: Lead[]) {
    const validateLeadActionExcelDataAction = new ValidateLeadActionExcelDataAction(excelData, leads);
    validateLeadActionExcelDataAction.Do(this)
    return validateLeadActionExcelDataAction.response;
  }
}

