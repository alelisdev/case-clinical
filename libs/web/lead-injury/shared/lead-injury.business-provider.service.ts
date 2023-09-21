
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { LeadInjury, UserCreateLeadInjuryInput, UserUpdateLeadInjuryInput, UpdateResult, Lead, Severity } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLeadInjuryExcelDataAction } from './actions/validate-lead-injury-excel-data.action'
import { CreateLeadInjuryAction } from './actions/create-lead-injury.action'
import { UpdateLeadInjuriesAction, UpdateLeadInjuryAction } from './actions/update-lead-injuries.action'


@Injectable({providedIn: 'root'})
export class LeadInjuryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LeadInjuryBusinessProviderService', logger, serviceContext)
  }

  createLeadInjury(input: UserCreateLeadInjuryInput): Observable<LeadInjury> {
    const action = new CreateLeadInjuryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLeadInjury(input: UserUpdateLeadInjuryInput, leadInjuryId: string): Observable<LeadInjury> {
    const action = new UpdateLeadInjuryAction(input, leadInjuryId); 
    action.Do(this);
    return action.response;   
  }
  
  importLeadInjuries(leadInjuries: UserUpdateLeadInjuryInput[]): Observable<UpdateResult> {
    const updateLeadInjuriesAction = new UpdateLeadInjuriesAction(leadInjuries);
    updateLeadInjuriesAction.Do(this)
    return updateLeadInjuriesAction.response;
  }

  validateLeadInjuryExcelData(excelData: any[], leads: Lead[], severities: Severity[]) {
    const validateLeadInjuryExcelDataAction = new ValidateLeadInjuryExcelDataAction(excelData, leads, severities);
    validateLeadInjuryExcelDataAction.Do(this)
    return validateLeadInjuryExcelDataAction.response;
  }
}

