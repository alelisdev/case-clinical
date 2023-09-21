
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorMedsToDate, UserCreatePriorMedsToDateInput, UserUpdatePriorMedsToDateInput, UpdateResult, LegalCase, PriorMedsToDateStatus } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorMedsToDateExcelDataAction } from './actions/validate-prior-meds-to-date-excel-data.action'
import { CreatePriorMedsToDateAction } from './actions/create-prior-meds-to-date.action'
import { UpdatePriorMedsToDatesAction, UpdatePriorMedsToDateAction } from './actions/update-prior-meds-to-dates.action'


@Injectable({providedIn: 'root'})
export class PriorMedsToDateBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorMedsToDateBusinessProviderService', logger, serviceContext)
  }

  createPriorMedsToDate(input: UserCreatePriorMedsToDateInput): Observable<PriorMedsToDate> {
    const action = new CreatePriorMedsToDateAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorMedsToDate(input: UserUpdatePriorMedsToDateInput, priorMedsToDateId: string): Observable<PriorMedsToDate> {
    const action = new UpdatePriorMedsToDateAction(input, priorMedsToDateId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorMedsToDates(priorMedsToDates: UserUpdatePriorMedsToDateInput[]): Observable<UpdateResult> {
    const updatePriorMedsToDatesAction = new UpdatePriorMedsToDatesAction(priorMedsToDates);
    updatePriorMedsToDatesAction.Do(this)
    return updatePriorMedsToDatesAction.response;
  }

  validatePriorMedsToDateExcelData(excelData: any[], legalCases: LegalCase[], priorMedsToDateStatuses: PriorMedsToDateStatus[]) {
    const validatePriorMedsToDateExcelDataAction = new ValidatePriorMedsToDateExcelDataAction(excelData, legalCases, priorMedsToDateStatuses);
    validatePriorMedsToDateExcelDataAction.Do(this)
    return validatePriorMedsToDateExcelDataAction.response;
  }
}

