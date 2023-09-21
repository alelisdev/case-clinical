
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { LeadTreatment, UserCreateLeadTreatmentInput, UserUpdateLeadTreatmentInput, UpdateResult, Lead, Treatment } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLeadTreatmentExcelDataAction } from './actions/validate-lead-treatment-excel-data.action'
import { CreateLeadTreatmentAction } from './actions/create-lead-treatment.action'
import { UpdateLeadTreatmentsAction, UpdateLeadTreatmentAction } from './actions/update-lead-treatments.action'


@Injectable({providedIn: 'root'})
export class LeadTreatmentBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LeadTreatmentBusinessProviderService', logger, serviceContext)
  }

  createLeadTreatment(input: UserCreateLeadTreatmentInput): Observable<LeadTreatment> {
    const action = new CreateLeadTreatmentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLeadTreatment(input: UserUpdateLeadTreatmentInput, leadTreatmentId: string): Observable<LeadTreatment> {
    const action = new UpdateLeadTreatmentAction(input, leadTreatmentId); 
    action.Do(this);
    return action.response;   
  }
  
  importLeadTreatments(leadTreatments: UserUpdateLeadTreatmentInput[]): Observable<UpdateResult> {
    const updateLeadTreatmentsAction = new UpdateLeadTreatmentsAction(leadTreatments);
    updateLeadTreatmentsAction.Do(this)
    return updateLeadTreatmentsAction.response;
  }

  validateLeadTreatmentExcelData(excelData: any[], leads: Lead[], treatments: Treatment[]) {
    const validateLeadTreatmentExcelDataAction = new ValidateLeadTreatmentExcelDataAction(excelData, leads, treatments);
    validateLeadTreatmentExcelDataAction.Do(this)
    return validateLeadTreatmentExcelDataAction.response;
  }
}

