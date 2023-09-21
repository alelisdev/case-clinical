
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { SurgicalPosition, UserCreateSurgicalPositionInput, UserUpdateSurgicalPositionInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateSurgicalPositionExcelDataAction } from './actions/validate-surgical-position-excel-data.action'
import { CreateSurgicalPositionAction } from './actions/create-surgical-position.action'
import { UpdateSurgicalPositionsAction, UpdateSurgicalPositionAction } from './actions/update-surgical-positions.action'


@Injectable({providedIn: 'root'})
export class SurgicalPositionBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.SurgicalPositionBusinessProviderService', logger, serviceContext)
  }

  createSurgicalPosition(input: UserCreateSurgicalPositionInput): Observable<SurgicalPosition> {
    const action = new CreateSurgicalPositionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateSurgicalPosition(input: UserUpdateSurgicalPositionInput, surgicalPositionId: string): Observable<SurgicalPosition> {
    const action = new UpdateSurgicalPositionAction(input, surgicalPositionId); 
    action.Do(this);
    return action.response;   
  }
  
  importSurgicalPositions(surgicalPositions: UserUpdateSurgicalPositionInput[]): Observable<UpdateResult> {
    const updateSurgicalPositionsAction = new UpdateSurgicalPositionsAction(surgicalPositions);
    updateSurgicalPositionsAction.Do(this)
    return updateSurgicalPositionsAction.response;
  }

  validateSurgicalPositionExcelData(excelData: any[] ) {
    const validateSurgicalPositionExcelDataAction = new ValidateSurgicalPositionExcelDataAction(excelData );
    validateSurgicalPositionExcelDataAction.Do(this)
    return validateSurgicalPositionExcelDataAction.response;
  }
}

