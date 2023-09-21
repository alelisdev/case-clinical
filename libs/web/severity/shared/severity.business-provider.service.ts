
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Severity, UserCreateSeverityInput, UserUpdateSeverityInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateSeverityExcelDataAction } from './actions/validate-severity-excel-data.action'
import { CreateSeverityAction } from './actions/create-severity.action'
import { UpdateSeveritiesAction, UpdateSeverityAction } from './actions/update-severities.action'


@Injectable({providedIn: 'root'})
export class SeverityBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.SeverityBusinessProviderService', logger, serviceContext)
  }

  createSeverity(input: UserCreateSeverityInput): Observable<Severity> {
    const action = new CreateSeverityAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateSeverity(input: UserUpdateSeverityInput, severityId: string): Observable<Severity> {
    const action = new UpdateSeverityAction(input, severityId); 
    action.Do(this);
    return action.response;   
  }
  
  importSeverities(severities: UserUpdateSeverityInput[]): Observable<UpdateResult> {
    const updateSeveritiesAction = new UpdateSeveritiesAction(severities);
    updateSeveritiesAction.Do(this)
    return updateSeveritiesAction.response;
  }

  validateSeverityExcelData(excelData: any[] ) {
    const validateSeverityExcelDataAction = new ValidateSeverityExcelDataAction(excelData );
    validateSeverityExcelDataAction.Do(this)
    return validateSeverityExcelDataAction.response;
  }
}

