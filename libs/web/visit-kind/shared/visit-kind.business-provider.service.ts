
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { VisitKind, UserCreateVisitKindInput, UserUpdateVisitKindInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateVisitKindExcelDataAction } from './actions/validate-visit-kind-excel-data.action'
import { CreateVisitKindAction } from './actions/create-visit-kind.action'
import { UpdateVisitKindsAction, UpdateVisitKindAction } from './actions/update-visit-kinds.action'


@Injectable({providedIn: 'root'})
export class VisitKindBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.VisitKindBusinessProviderService', logger, serviceContext)
  }

  createVisitKind(input: UserCreateVisitKindInput): Observable<VisitKind> {
    const action = new CreateVisitKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateVisitKind(input: UserUpdateVisitKindInput, visitKindId: string): Observable<VisitKind> {
    const action = new UpdateVisitKindAction(input, visitKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importVisitKinds(visitKinds: UserUpdateVisitKindInput[]): Observable<UpdateResult> {
    const updateVisitKindsAction = new UpdateVisitKindsAction(visitKinds);
    updateVisitKindsAction.Do(this)
    return updateVisitKindsAction.response;
  }

  validateVisitKindExcelData(excelData: any[] ) {
    const validateVisitKindExcelDataAction = new ValidateVisitKindExcelDataAction(excelData );
    validateVisitKindExcelDataAction.Do(this)
    return validateVisitKindExcelDataAction.response;
  }
}

