
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Injury, UserCreateInjuryInput, UserUpdateInjuryInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateInjuryExcelDataAction } from './actions/validate-injury-excel-data.action'
import { CreateInjuryAction } from './actions/create-injury.action'
import { UpdateInjuriesAction, UpdateInjuryAction } from './actions/update-injuries.action'


@Injectable({providedIn: 'root'})
export class InjuryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InjuryBusinessProviderService', logger, serviceContext)
  }

  createInjury(input: UserCreateInjuryInput): Observable<Injury> {
    const action = new CreateInjuryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInjury(input: UserUpdateInjuryInput, injuryId: string): Observable<Injury> {
    const action = new UpdateInjuryAction(input, injuryId); 
    action.Do(this);
    return action.response;   
  }
  
  importInjuries(injuries: UserUpdateInjuryInput[]): Observable<UpdateResult> {
    const updateInjuriesAction = new UpdateInjuriesAction(injuries);
    updateInjuriesAction.Do(this)
    return updateInjuriesAction.response;
  }

  validateInjuryExcelData(excelData: any[] ) {
    const validateInjuryExcelDataAction = new ValidateInjuryExcelDataAction(excelData );
    validateInjuryExcelDataAction.Do(this)
    return validateInjuryExcelDataAction.response;
  }
}

