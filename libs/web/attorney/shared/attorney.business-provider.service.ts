
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Attorney, UserCreateAttorneyInput, UserUpdateAttorneyInput, UpdateResult, Firm, AttorneyStatus, AttorneyType } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAttorneyExcelDataAction } from './actions/validate-attorney-excel-data.action'
import { CreateAttorneyAction } from './actions/create-attorney.action'
import { UpdateAttorneysAction, UpdateAttorneyAction } from './actions/update-attorneys.action'


@Injectable({providedIn: 'root'})
export class AttorneyBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AttorneyBusinessProviderService', logger, serviceContext)
  }

  createAttorney(input: UserCreateAttorneyInput): Observable<Attorney> {
    const action = new CreateAttorneyAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAttorney(input: UserUpdateAttorneyInput, attorneyId: string): Observable<Attorney> {
    const action = new UpdateAttorneyAction(input, attorneyId); 
    action.Do(this);
    return action.response;   
  }
  
  importAttorneys(attorneys: UserUpdateAttorneyInput[]): Observable<UpdateResult> {
    const updateAttorneysAction = new UpdateAttorneysAction(attorneys);
    updateAttorneysAction.Do(this)
    return updateAttorneysAction.response;
  }

  validateAttorneyExcelData(excelData: any[], firms: Firm[], attorneyStatuses: AttorneyStatus[], attorneyTypes: AttorneyType[]) {
    const validateAttorneyExcelDataAction = new ValidateAttorneyExcelDataAction(excelData, firms, attorneyStatuses, attorneyTypes);
    validateAttorneyExcelDataAction.Do(this)
    return validateAttorneyExcelDataAction.response;
  }
}

