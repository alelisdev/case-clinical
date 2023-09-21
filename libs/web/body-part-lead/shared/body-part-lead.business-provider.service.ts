
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { BodyPartLead, UserCreateBodyPartLeadInput, UserUpdateBodyPartLeadInput, UpdateResult, Lead, BodyPart } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateBodyPartLeadExcelDataAction } from './actions/validate-body-part-lead-excel-data.action'
import { CreateBodyPartLeadAction } from './actions/create-body-part-lead.action'
import { UpdateBodyPartLeadsAction, UpdateBodyPartLeadAction } from './actions/update-body-part-leads.action'


@Injectable({providedIn: 'root'})
export class BodyPartLeadBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.BodyPartLeadBusinessProviderService', logger, serviceContext)
  }

  createBodyPartLead(input: UserCreateBodyPartLeadInput): Observable<BodyPartLead> {
    const action = new CreateBodyPartLeadAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateBodyPartLead(input: UserUpdateBodyPartLeadInput, bodyPartLeadId: string): Observable<BodyPartLead> {
    const action = new UpdateBodyPartLeadAction(input, bodyPartLeadId); 
    action.Do(this);
    return action.response;   
  }
  
  importBodyPartLeads(bodyPartLeads: UserUpdateBodyPartLeadInput[]): Observable<UpdateResult> {
    const updateBodyPartLeadsAction = new UpdateBodyPartLeadsAction(bodyPartLeads);
    updateBodyPartLeadsAction.Do(this)
    return updateBodyPartLeadsAction.response;
  }

  validateBodyPartLeadExcelData(excelData: any[], leads: Lead[], bodyParts: BodyPart[]) {
    const validateBodyPartLeadExcelDataAction = new ValidateBodyPartLeadExcelDataAction(excelData, leads, bodyParts);
    validateBodyPartLeadExcelDataAction.Do(this)
    return validateBodyPartLeadExcelDataAction.response;
  }
}

