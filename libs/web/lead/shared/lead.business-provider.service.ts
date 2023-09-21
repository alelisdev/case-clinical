
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Lead, UserCreateLeadInput, UserUpdateLeadInput, UpdateResult, AccidentType, Document, LeadStatus, LeadSource, User } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLeadExcelDataAction } from './actions/validate-lead-excel-data.action'
import { CreateLeadAction } from './actions/create-lead.action'
import { SyncMrnToPharmacyAction } from './actions/sync-mrn-to-pharmacy.action'
import { UpdateLeadsAction, UpdateLeadAction } from './actions/update-leads.action'


@Injectable({providedIn: 'root'})
export class LeadBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LeadBusinessProviderService', logger, serviceContext)
  }

  createLead(input: UserCreateLeadInput): Observable<Lead> {
    const action = new CreateLeadAction(input);
    action.Do(this);
    return action.response;
  }

  updateLead(input: UserUpdateLeadInput, leadId: string): Observable<Lead> {
    const action = new UpdateLeadAction(input, leadId);
    action.Do(this);
    return action.response;
  }

  userSyncMrnToPharmacy(input: UserUpdateLeadInput): Observable<boolean> {
    const action = new SyncMrnToPharmacyAction(input);
    action.Do(this);
    return action.response;
  }

  importLeads(leads: UserUpdateLeadInput[]): Observable<UpdateResult> {
    const updateLeadsAction = new UpdateLeadsAction(leads);
    updateLeadsAction.Do(this)
    return updateLeadsAction.response;
  }

  validateLeadExcelData(excelData: any[], accidentTypes: AccidentType[], statuses: LeadStatus[], sourceOfLeads: LeadSource[], submittedBies: User[]) {
    const validateLeadExcelDataAction = new ValidateLeadExcelDataAction(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies);
    validateLeadExcelDataAction.Do(this)
    return validateLeadExcelDataAction.response;
  }
}

